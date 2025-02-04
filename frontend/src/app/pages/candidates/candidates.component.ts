import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { CommonModule } from '@angular/common'; // ✅ Import this

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  standalone: true,
  imports: [CommonModule] // ✅ Add this
})
export class CandidatesComponent implements OnInit {
  candidates: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
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
}
