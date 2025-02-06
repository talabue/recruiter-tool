import { Component } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddCandidateComponent {
  candidate = { name: '', email: '' };
  resumeFile?: File;
  errorMessage = '';
  successMessage = '';

  constructor(private candidateService: CandidateService, private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const allowedExtensions = ['pdf', 'doc', 'docx', 'txt'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        this.resumeFile = file; 
        this.errorMessage = ''; 
      } else {
        this.resumeFile = undefined;
        this.errorMessage = 'Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.';
      }
    }
  }  

  onSubmit() {
    // Require name and email, but make resume optional
    if (!this.candidate.name || !this.candidate.email) {
      this.errorMessage = 'Name and Email are required.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.candidate.name);
    formData.append('email', this.candidate.email);
    
    if (this.resumeFile) {
      formData.append('resume', this.resumeFile); 
    }

    this.candidateService.createCandidate(formData).subscribe({
      next: () => {
        this.successMessage = 'Candidate added successfully!';
        setTimeout(() => this.router.navigate(['/candidates']), 1500); 
      },
      error: (error) => {
        this.errorMessage = 'Error adding candidate.';
        console.error('Candidate Add Error:', error);
      }
    });
  }
}
