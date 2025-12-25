import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagBox } from './tag-box';

describe('TagBox', () => {
  let component: TagBox;
  let fixture: ComponentFixture<TagBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagBox],
    }).compileComponents();

    fixture = TestBed.createComponent(TagBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
