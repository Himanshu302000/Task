import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  constructor(private modalCtrl: ModalController, private http: HttpClient) { }

  messages = [
    { from: 'bot', text: 'Hello, how can I help you?' },
  ];

  newMessage = '';

  qaData: any;

  ngOnInit() {
    this.http.get<any>('assets/qa-data.json').subscribe(data => {
      this.qaData = data;
      console.log(data);
    });
  }


sendMessage() {
  if (!this.newMessage || !this.newMessage.trim()) {
    return;
  }

  this.messages.push({
    from: 'user',
    text: this.newMessage
  });

  let question = this.newMessage.toLowerCase().replace(/[^a-z ]/g, '');

  let response: string = '';

  if (question.includes('my name is ')) {
    const name = question.split('my name is ')[1].trim();
    response = `Hello, ${name}! How can I assist you today?`;
  } else {
    const qa = this.qaData.find((qa: { question: string; }) => qa.question.toLowerCase().replace(/[^a-z ]/g, '') === question);
    if (qa) {
      response = qa.answer;
    } else {
      response = "I'm sorry, I don't know the answer to that question.";
    }
  }

  this.messages.push({
    from: 'bot',
    text: response
  });

  this.newMessage = '';
}

dismiss() {
  this.modalCtrl.dismiss({
    dismissed: true,
  });
}
}