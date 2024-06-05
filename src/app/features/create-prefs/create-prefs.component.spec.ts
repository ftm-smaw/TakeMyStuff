import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrefsComponent } from './create-prefs.component';

describe('CreatePrefsComponent', () => {
  let component: CreatePrefsComponent;
  let fixture: ComponentFixture<CreatePrefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrefsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePrefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
