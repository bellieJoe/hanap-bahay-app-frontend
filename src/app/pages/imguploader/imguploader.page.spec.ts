import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImguploaderPage } from './imguploader.page';

describe('ImguploaderPage', () => {
  let component: ImguploaderPage;
  let fixture: ComponentFixture<ImguploaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImguploaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImguploaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
