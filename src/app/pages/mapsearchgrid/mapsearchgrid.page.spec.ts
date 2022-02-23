import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapsearchgridPage } from './mapsearchgrid.page';

describe('MapsearchgridPage', () => {
  let component: MapsearchgridPage;
  let fixture: ComponentFixture<MapsearchgridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsearchgridPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapsearchgridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
