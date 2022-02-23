import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResexpPage } from './resexp.page';

describe('ResexpPage', () => {
  let component: ResexpPage;
  let fixture: ComponentFixture<ResexpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResexpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResexpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
