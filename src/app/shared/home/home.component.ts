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
  loading: any = false;

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

    this.loading = true;
    this.output = false;

    this.API.apiCall(environment.host + environment.endpoints['test'], { body: this.htmlEditor.getValue() }).subscribe((data) => {
      console.log("RESP", data);
      if (data.state !== "success" || !data.data) {
        this.clearLoading();
        return false;
      }

      if (data.data) {
        this.output = data.data;
        this.clearLoading();
      }
    });
  }

  clearLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
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
