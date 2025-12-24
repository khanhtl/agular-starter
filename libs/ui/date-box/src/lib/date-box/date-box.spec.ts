import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateBox } from './date-box';

describe('DateBox', () => {
  let component: DateBox;
  let fixture: ComponentFixture<DateBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateBox],
    }).compileComponents();

    fixture = TestBed.createComponent(DateBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
