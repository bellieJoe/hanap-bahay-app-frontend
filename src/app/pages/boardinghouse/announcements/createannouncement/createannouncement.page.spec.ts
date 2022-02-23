import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateannouncementPage } from './createannouncement.page';

describe('CreateannouncementPage', () => {
  let component: CreateannouncementPage;
  let fixture: ComponentFixture<CreateannouncementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateannouncementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateannouncementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
