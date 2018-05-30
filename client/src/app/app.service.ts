import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable(
  {
    providedIn: 'root',
  }
)
export class AppService {

    constructor(private http: HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    getTextFile() {
        return this.http.get('http://localhost:3000/textfile', { responseType: 'text', observe: 'response'} );
    }

    getZipFile() {
      // responseType of either arraybuffer or blob.
      return this.http.get('http://localhost:3000/zipfile', { responseType: 'arraybuffer', observe: 'response'} );
  }

  getPdfFile() {
    // responseType of either arraybuffer or blob.
    return this.http.get('http://localhost:3000/pdffile', { responseType: 'arraybuffer', observe: 'response'} );
}
}
