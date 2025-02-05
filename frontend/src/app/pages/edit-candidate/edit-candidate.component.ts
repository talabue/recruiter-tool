import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // ✅ Enable form bindings
})
export class EditCandidateComponent implements OnInit {
  candidate: any = { name: '', email: '' }; 
  selectedFile: File | null = null; // ✅ Ensure this property exists
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit() {
    const candidateId = this.route.snapshot.paramMap.get('id');
    if (candidateId) {
      this.candidateService.getCandidate(candidateId).subscribe({
        next: (data) => this.candidate = data,
        error: (error) => this.errorMessage = 'Failed to load candidate details.',
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpdateCandidate() {
    if (!this.candidate.name || !this.candidate.email) {
      this.errorMessage = 'Name and Email are required.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.candidate.name);
    formData.append('email', this.candidate.email);
    formData.append('phone', this.candidate.phone);
    formData.append('status', this.candidate.status);

    if (this.selectedFile) {
      formData.append('resume', this.selectedFile); // ✅ Attach resume file
    }

    this.candidateService.updateCandidate(this.candidate._id, formData).subscribe({
      next: () => this.router.navigate(['/candidates']),
      error: (error) => this.errorMessage = 'Failed to update candidate.',
    });
  }

  onSubmit() {
    this.candidateService.updateCandidate(this.candidate._id, this.candidate).subscribe({
      next: () => this.router.navigate(['/candidates']), // ✅ Redirect to list
      error: (error) => this.errorMessage = 'Failed to update candidate.'
    });
  }
}
