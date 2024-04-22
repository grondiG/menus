import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSkillsService {
  getSkills(): Observable<string[]> {
    return of(['typescript', 'javascript', 'angular', 'git']).pipe(
      delay(2500)
    );
  }
}
