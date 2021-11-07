import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.http
      .get<any[]>(
        'https://devdactic.fra1.digitaloceanspaces.com/gmail/data.json'
      )
      .subscribe((res) => {
        this.emails = res.map((email) => {
          email.color = this.intToRGB(this.hashCode(email.from));
          return email;
        });
        console.log(this.emails);
      });
  }

  private hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRGB(i) {
    let c = (i & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }

  openDetails(id) {
    // this.router.navigate(['tabs', 'mail', id]);
    console.log('To Details');
  }

  async openAccount(ev) {
    const popover = await this.popoverCtrl.create({
      component: AccountPage,
      event: ev,
      cssClass: 'custom-popover',
    });

    await popover.present();
  }

  doRefresh(ev) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }
}
