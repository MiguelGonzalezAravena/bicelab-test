import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchKeyDateComponent } from './search-key-date.component';

describe('SearchKeyDateComponent', () => {
  let component: SearchKeyDateComponent;
  let fixture: ComponentFixture<SearchKeyDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchKeyDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchKeyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
