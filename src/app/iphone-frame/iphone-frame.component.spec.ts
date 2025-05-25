import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphoneFrameComponent } from './iphone-frame.component';

describe('IphoneFrameComponent', () => {
  let component: IphoneFrameComponent;
  let fixture: ComponentFixture<IphoneFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IphoneFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IphoneFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
