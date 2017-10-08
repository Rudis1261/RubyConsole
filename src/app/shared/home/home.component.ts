import { Component, OnInit } from '@angular/core';
import { LoadScriptService } from '../../services/load-script.service';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

declare var ace: any;
declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  html: any;
  htmlEditor: any;
  output: any;
  error: any = false;
  loading: any = false;

  search: any = '';
  searching: any = false;
  searchResp: any = false;

  constructor(
    private API: ApiService,
    private LS: LoadScriptService
  ) {
  }

  ngOnInit() {
    this.LS.loadScript("assets/ace/ace.js", "js", () => {
      setTimeout(() => {
        this.init();
      }, 100);
    });
  }

  update() {
    console.log("ACE Editor Updates");
  }

  run() {
    if (this.loading || !this.htmlEditor.getValue()) {
      return false;
    }

    this.error = false;
    this.loading = true;
    this.output = false;

    this.API.apiCall(environment.host + environment.endpoints['document'], { body: this.htmlEditor.getValue() }).subscribe((data) => {
      //console.log("RESP", data);
      if (data.state !== "success" || !data.data) {
        this.clearLoading();
        this.output = data.message;
        this.error = true;
        return false;
      }

      if (data.data) {
        this.output = data.data;
        this.clearLoading();
      }
    });
  }

  ri() {
    if (!this.search || this.search == '' || this.searching) {
      return false;
    }

    this.searching = true;
    this.searchResp = false;

    this.API.apiCall(environment.host + environment.endpoints['help'], { body: this.search }).subscribe((data) => {
      if (data.state !== "success" || !data.data) {
        this.searchResp = false;
        this.searching = false;
        return false;
      }

      if (data.data) {
        this.searching = false;
        this.searchResp = data.data;
      }
    });
  }

  clearLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  init() {
    this.htmlEditor = ace.edit("editor");
    this.htmlEditor.setTheme("ace/theme/github");
    this.htmlEditor.session.setMode("ace/mode/ruby");
    this.htmlEditor.setValue('puts "Hello, World"');

    // this.htmlEditor.getSession().on('change', function(e) {
    //   this.update();
    // });
  }
}
