import { Injectable } from '@angular/core';
import { Requirement } from './requirement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
    constructor(private httpClient:HttpClient) {}
    readonly url = 'http://localhost:3000/requirements';

  getRequirements():Observable<Requirement[]>{

    return this.httpClient.get<Requirement[]>(this.url);

  //   return [
  //     { id: 2000, title:'USB wire', contacMobileNo:'0980137152'},
  //   { id: 3000, title:'USB wire2', contacMobileNo:'0980137153'},
  //   { id: 4000, title:'USB wire3', contacMobileNo:'0980137154'}
  // ]
  }
  getRequirement(id:number):Observable<Requirement>{

    return this.httpClient.get<Requirement>(`${this.url}/${id}`);

  }
  addRequirement(newRequirement: Requirement): Observable<Requirement> {
    return this.httpClient.post<Requirement>(this.url, newRequirement);
    }
  
  deleteRequirement(id: number): Observable<void> {
    // localhost:3000/requirements/1010
    return this.httpClient.delete<void>(`${this.url}/${id}`)
     // return this.httpClient.delete<void>(this.url +'/'+ id)
    }

  editRequirement(id: number, editRequirement: Requirement): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${id}`, editRequirement);
  }
  approveRequirement(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/${id}`, { status: 'A' });
  }
  rejectRequirement(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/${id}`, { status: 'B' });
  }
}
 