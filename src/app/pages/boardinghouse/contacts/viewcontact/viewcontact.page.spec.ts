import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewcontactPage } from './viewcontact.page';

describe('ViewcontactPage', () => {
  let component: ViewcontactPage;
  let fixture: ComponentFixture<ViewcontactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcontactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewcontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
