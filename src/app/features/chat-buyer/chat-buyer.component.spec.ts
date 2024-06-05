import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBuyerComponent } from './chat-buyer.component';

describe('ChatBuyerComponent', () => {
  let component: ChatBuyerComponent;
  let fixture: ComponentFixture<ChatBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBuyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
