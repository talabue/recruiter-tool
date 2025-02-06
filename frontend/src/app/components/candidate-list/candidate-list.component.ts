import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent implements OnInit {
  candidates: any[] = [];

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.candidateService.getCandidates().subscribe(data => {
      this.candidates = data;
    });
  }
}
