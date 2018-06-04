import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveToUsbComponent } from './save-to-usb.component';

describe('SaveToUsbComponent', () => {
  let component: SaveToUsbComponent;
  let fixture: ComponentFixture<SaveToUsbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveToUsbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveToUsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
