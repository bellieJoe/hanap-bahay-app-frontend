import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagapangasiwaPage } from './tagapangasiwa.page';

describe('TagapangasiwaPage', () => {
  let component: TagapangasiwaPage;
  let fixture: ComponentFixture<TagapangasiwaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagapangasiwaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagapangasiwaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
