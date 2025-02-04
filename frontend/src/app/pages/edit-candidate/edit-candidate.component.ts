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
  candidate: any = { name: '', email: '' }; // ✅ Default values
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
        error: (error) => this.errorMessage = 'Failed to load candidate details.'
      });
    }
  }

  onSubmit() {
    this.candidateService.updateCandidate(this.candidate._id, this.candidate).subscribe({
      next: () => this.router.navigate(['/candidates']), // ✅ Redirect to list
      error: (error) => this.errorMessage = 'Failed to update candidate.'
    });
  }
}
