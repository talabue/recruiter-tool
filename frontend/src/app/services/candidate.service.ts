import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = '/api/candidates';

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCandidate(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCandidate(candidate: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, candidate);
  }
  
  deleteCandidate(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateCandidate(candidateId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${candidateId}`, updatedData);
  }
   
}
