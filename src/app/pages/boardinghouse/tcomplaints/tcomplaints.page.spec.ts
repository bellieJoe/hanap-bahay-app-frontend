import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TcomplaintsPage } from './tcomplaints.page';

describe('TcomplaintsPage', () => {
  let component: TcomplaintsPage;
  let fixture: ComponentFixture<TcomplaintsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcomplaintsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TcomplaintsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
