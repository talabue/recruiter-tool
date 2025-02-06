import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class CandidatesComponent implements OnInit {
  candidates: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private candidateService: CandidateService, private router: Router) {}

  ngOnInit() {
    this.candidateService.getCandidates().subscribe({
      next: (data) => {
        this.candidates = data;
        console.log('📂 Candidate Data:', this.candidates); 
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load candidates.';
        console.error('Candidate Fetch Error:', error);
        this.loading = false;
      }
    });
  }
  
  // Edit Candidate
  editCandidate(candidateId: string) {
    console.log('📝 Navigating to edit candidate:', candidateId); 
    this.router.navigate(['/edit-candidate', candidateId]);
  }
  
  // Fetch all candidates from API
  fetchCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (data) => {
        this.candidates = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load candidates.';
        console.error('Candidate Fetch Error:', error);
        this.loading = false;
      }
    });
  }

  // Navigate to Add Candidate Form
  navigateToAddCandidate(): void {
    this.router.navigate(['/candidates/add']);
  }

  // Delete a candidate
  deleteCandidate(candidateId: string) {
    const confirmed = window.confirm('Are you sure you want to delete this candidate?');
  
    if (confirmed) {
      this.candidateService.deleteCandidate(candidateId).subscribe({
        next: () => {
          this.candidates = this.candidates.filter(candidate => candidate._id !== candidateId);
        },
        error: (error) => {
          console.error('❌ Error deleting candidate:', error);
          this.errorMessage = 'Failed to delete candidate.';
        }
      });
    }
  }

  viewResume(resumeUrl: string) {
    const fullUrl = `http://localhost:5001/api/uploads/${resumeUrl}`; 
    const fileExtension = resumeUrl.split('.').pop()?.toLowerCase();
  
    if (fileExtension === 'pdf') {
      window.open(fullUrl, '_blank'); // Open new tab for PDF
    } else {
      window.location.href = fullUrl; // Trigger download for other file types
    }
  }  
}