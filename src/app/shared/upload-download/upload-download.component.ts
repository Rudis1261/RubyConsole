import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-download',
  templateUrl: './upload-download.component.html',
  styleUrls: ['./upload-download.component.scss']
})
export class UploadDownloadComponent implements OnInit {

  @Output() onUpload: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDownload: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  handleFileSelect(evt) {
    let $scope = this;
    let files = evt.target.files;

    for (let i = 0, f; f = files[i]; i++) {

      let reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          $scope.onUpload.emit(e.target.result);
        };
      })(f);

      // Read the file
      reader.readAsText(f);
    }
  }

  triggerDownload() {
    this.onDownload.emit(true);
  }
}
