import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Import HttpClientModule (needed for HttpClient)
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { AppDataService } from '../../services/app-data.service';
import { PromptService } from '../../services/prompt.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  appList: any[] = [];  // Store application data
  selectedApplication: string = '';  // Track the selected application name
  selectedApplicationContent: string = '';  // Track the content for the selected application
  selectedRole: string = '';  // Track the selected role
  isFileInputDisabled: boolean = false;
  isDropdownDisabled: boolean = false;
  isDropdownSelected: boolean = false;
  isFileUploaded: boolean = false;
  isRoleSelected: boolean = false;
  fileContents: string[] = [];
  errorMessage: string | null = null; // Declare the errorMessage property
  ktFiles: File[] = [];
  selectedFileName: string = '';
  rolePrompt: string = '';

  constructor(private dataService: DataService, private router: Router, private pdfService: PdfService, private http: HttpClient, private appDataService: AppDataService, private promptService: PromptService) {}

  ngOnInit(): void {
    // Fetch the app list from the mock API (assets folder)
    this.appDataService.getAppList().subscribe(
      (data) => {
        this.appList = data;
      },
      (error) => {
        console.error('Error fetching app list:', error);
        this.errorMessage = 'Failed to load application list.';
      }
    );
  }

  // Handle dropdown change event
  onDropdownChange() {
    this.isDropdownSelected = true;
    this.isFileInputDisabled = true; // Disable file input when dropdown is selected
    // Get selected application content from the list (you may need to set this manually or dynamically)
    const selectedApp = this.appList.find(app => app.name === this.selectedApplication);
    if (selectedApp) {
      this.selectedApplicationContent = selectedApp.content; // Assign the content of the selected app
    }
  }


  // Handle file select event
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      this.isFileUploaded = true; // Set file uploaded flag
      this.isDropdownDisabled = true; // Disable dropdown when file is selected
      this.selectedFileName = file.name;  // Store the file name

      // Process the file
      this.ktFiles = Array.from(event.target.files);

      // Read the file content as text for each file
      this.ktFiles.forEach((ktFile, index) => {
        if (ktFile.type === 'application/pdf' || ktFile.type === 'application/msword' || ktFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          this.pdfService.extractTextFromPDF(ktFile).subscribe(
            (response) => {
              const extractedText = response.text.replace(/\s+/g, ' ').trim();
              console.log(`Extracted text from file ${index + 1}:`, extractedText);
              this.fileContents[index] = extractedText;
            },
            (error) => {
              console.error(`Error extracting text for file ${index + 1}:`, error);
              this.errorMessage = `Error extracting text from file ${index + 1}.`;
            }
          );
        } else if (ktFile.type.startsWith('text/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.fileContents[index] = reader.result as string;
          };
          reader.readAsText(ktFile);
        } else {
          this.errorMessage = 'Unsupported file type';
          console.error('Unsupported file type');
        }
      });
    } else {
      console.log('No file selected.');
      this.isFileUploaded = false; // Reset file uploaded flag
    }
  }
 // Handle role selection
  onRoleSelect() {
    this.isRoleSelected = true; // Set role selected flag

    // Get the role-based prompt using the PromptService
   this.rolePrompt = this.promptService.generatePrompt(this.selectedRole);
    //console.log('Generated Role Prompt:', rolePrompt);
  }

  // Reset the form fields and states
  onReset() {
    this.selectedApplication = ''; // Reset dropdown value
    this.isFileInputDisabled = false;  // Enable file input
    this.isDropdownDisabled = false;  // Enable dropdown
    this.isDropdownSelected = false; // Reset dropdown selection flag
    this.isFileUploaded = false; // Reset file uploaded flag
    this.isRoleSelected = false; // Reset role selected flag
    this.selectedFileName = ''; // Reset the selected file name

    // Clear the file input field (optional)
    const fileInput: any = document.getElementById('fileUpload');
    if (fileInput) {
      fileInput.value = ''; // Clear the selected file
    }

    // Reset radio buttons to default (unselected)
    const radioButtons = document.getElementsByName('role') as NodeListOf<HTMLInputElement>;
    radioButtons.forEach(radioButton => {
      radioButton.checked = false; // Uncheck all radio buttons
    });
  }
onSubmit() {
  // Create the formData object
  const formData = {
    application: this.selectedApplication,
    selectedApplicationContent: this.selectedApplicationContent,
    filesContent: this.fileContents,  // Include the file content
    role: this.selectedRole,
  };

  // Create a single string to append all form data into one string
let finalString = `---Prompt for GPT ---\n`;

// Check if application and content are provided (and are not just empty or whitespace)
if (formData.application && formData.selectedApplicationContent && formData.application.trim() !== "" && formData.selectedApplicationContent.trim() !== "") {
  finalString += `Role Prompt: ${this.rolePrompt}\n`;  // Role prompt
  finalString += `Application: ${formData.application}\n`;  // Application name
  finalString += `Application Content: ${formData.selectedApplicationContent}\n`;  // Application content
}

// Check if file content exists and is not empty or just whitespace
else if (formData.filesContent && formData.filesContent.length > 10) {
  finalString += `Role Prompt: ${this.rolePrompt}\n`;  // Role prompt

  // Iterate over file content and check if each item (which is a string) is not empty or just spaces
  formData.filesContent.forEach((fileContent: string, index: number) => {
    if (fileContent.trim() !== "") {  // Ensure that the string is not empty or just whitespace
      finalString += `File Content ${index + 1}:\n${fileContent}\n`;  // File content
    }
  });
}

// If no valid content is available, handle the issue gracefully
else {
  finalString += `\nI am not able to read your document due to some technical issues. Please contact my developer for assistance.`;
}





    // 1) flag that the user legitimately submitted the form
    this.dataService.markFormSubmitted();

    // 2) push the prompt into the shared stream
    this.dataService.changeData(finalString);

    // 3) go to the bot
    this.router.navigate(['/bot']);
}






}
