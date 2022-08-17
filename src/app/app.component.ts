import { Component } from '@angular/core';
import {fromWorkerPool} from "observable-webworker";
import {FileHashPayload} from "./file-hasher.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public hashFiles($event:any): void {
    const files: File[] = Array.from($event.target.files);
    console.log(`files`, files);
    fromWorkerPool<File, FileHashPayload>(
      () => new Worker(new URL(`./file-hasher.worker.ts`, import.meta.url), { type: 'module' }),
      files,
    ).subscribe((hashPayload: FileHashPayload) => {
      console.log('Hashed file', hashPayload.filename, hashPayload.hash);
    });
  }

}
