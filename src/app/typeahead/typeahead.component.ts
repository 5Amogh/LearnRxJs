import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent {
 output:string[] = []

  getContinents(keys: any) {
    return [
      'africa',
      'antarctica',
      'asia',
      'australia',
      'europe',
      'north america',
      'south america',
    ].filter((e) => e.indexOf(keys.toLowerCase()) > -1);
  }

  requestContinents(keys: any){
    return of(this.getContinents(keys)).pipe(
      tap((_) => console.log(`API CALL at ${new Date()}`))
    );
  }

  keyUpEvent($event: any) {
    fromEvent($event.target,'keyup').pipe(
        debounceTime(200),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap(() => this.requestContinents($event.target.value)),
      )
      .subscribe( data => this.output = data);
  }

  trackByContinent(index:number, i:string){
    return i
  }

}
