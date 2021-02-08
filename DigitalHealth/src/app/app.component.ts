import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Physiomo';
  schema = {
    '@context': 'http://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: 'Physiomo',
        url: 'http://35.210.164.10',
        logo: 'http://35.210.164.10/assets/bilder/logo.png',
        description:
          'Wir bieten KI gestützte Empfehlung von Übungen zur Gesundheitsvorsorge und Wiederherstellung',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was genau macht Physiomo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                ' Wir verstehen uns als die #1 Anlaufstelle, wenn es um die Prävention, Genesung und das langfristige Gesundhalten deines\n              Körpers geht. Mit Unterstützung von topausgebildeten\n              Physiotherapeuten bieten wir dir passgenaue Übungen und\n              Alltagstipps, um dich bei deinem Weg in ein körperlich gesundes\n              und beschwerdefreies Leben zu unterstützen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Welche Vorteile bietet mir Physiomo als Patient?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'Als Onlineplattform ist unser großer Vorteil insbesondere die\n              Fähigkeit, Ihnen bei akuten Schmerzen sofort die notwendigen\n              Übungen und Gegenmaßnahmen per Videoanleitung zukommen zu lassen.\n              Sie sparen sich neben dem Weg zum Arzt und dem anschließenden\n              Warten auf einen Termin bei Ihrem Physiotherapeuten zusätzlich die\n              Anfahrt. Außerdem bleiben Ihre Videos gespeichert, wodurch Sie die\n              Übungen immer wieder nachmachen können und Ihre Erfolge in Ihrem\n              eigenen Tracking-Tool mitschreiben können.',
            },
          },
          {
            '@type': 'Question',
            name:
              'Sind meine privaten Daten und meine Krankheitsbilder bei Physiomo\n            sicher?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'Ja. Alle deine Daten werden streng vertraulich behandelt und nur\n              zum Zweck der optimalen Passung der Übungen zu deinem\n              Krankheitsbild ausgewertet. Sie unterliegen den\n              Datenschutzregelungen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Was kostet Physiomo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                ' Das Basic-Abonnement beginnt schon bei 9,99€ im Monat, das\n              Plus-Abonnement kostet 24,99€ und das Pro-Abonnement kostet 43,99€\n              im Monat.',
            },
          },
          {
            '@type': 'Question',
            name:
              'Welche Systemvoraussetzungen muss ich erfüllen, um Physiomo nutzen\n            zu können?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                ' Es ist ein internetfähiges Gerät notwendig. Die Internet Browser\n              Mozilla Firefox, Google Chrome oder auch Apple Safari können für\n              die Videoberatung genutzt werden. Bei mobilen Geräten (Smartphone\n              oder Tablet) wird das Betriebssystem iOS ab der Version 11.2 und\n              Android Version 4 und höher benötigt.',
            },
          },
          {
            '@type': 'Question',
            name:
              'Brauche ich Erfahrung im Bereich Physiotherapie, um die Übungen\n            ausführen zu können?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                ' Nein, alle Übungen werden sehr ausführlich erklärt. Außerdem legen\n              wir viel Wert auf leichte Übungen mit hohem Effekt. Dadurch wollen\n              wir sicherstellen, dass jede Übung richtig ausgeführt wird und der\n              Genesungsprozess optimale Fortschritte macht.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kann ich die Übungen speichern und offline schauen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                ' Ja. Sie können in Ihrem persönlichen Konto alle Übungen speichern,\n              um Sie offline abrufen zu können. Damit wollen wir sicherstellen,\n              dass Sie immer Zugang dazu haben. Sobald Ihr Vertrag ausläuft,\n              wird Ihr Konto gesperrt.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wenn Dinge unklar sind, kann ich Fragen stellen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                ' Ja. Unser Support steht Ihnen gerne bei allen Fragen rund um XY\n              von Mo. - Sa. 9-18 Uhr zur Seite. Diesen erreichen Sie problemlos\n              unter support@xy.de',
            },
          },
        ],
      },
    ],
  };

  constructor(public router: Router) {
    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('set', 'page', event.urlAfterRedirects);
        gtag('set', 'title', 'Physiomo');
        gtag('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#164969',
        },
        button: {
          background: '#ffe000',
          text: '#164969',
        },
      },
      theme: 'classic',
      content: {
        message:
          'Hier mit stimmen sie der Nutztung auch nicht funktionaler Cookies zu',
        dismiss: 'Annehmen',
        // link: 'this.cookieLinkText',
        // href: environment.Frontend + '/dataprivacy',
      },
    });
  }
}
