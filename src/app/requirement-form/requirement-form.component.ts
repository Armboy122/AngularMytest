import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequirementService } from '../requirement.service';
import { Requirement } from '../requirement';
import { thMobile } from '../Format/th-mobile.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.css'],
})
export class RequirementFormComponent implements OnInit {
  title = new FormControl('', Validators.required);
  contactMobileNo = new FormControl('', [Validators.required, thMobile]);

  fg = new FormGroup({
    title: this.title,
    contactMobileNo: this.contactMobileNo,
  });

  editId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requirementService: RequirementService
  ) {}

  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.editId) {
      // this.title.disable() แก้ไขเบอร์ไม่ได้
      // this.contactMobileNo.disable() แก้ไขชื่อไม่ได้
      this.requirementService
        .getRequirement(this.editId)
        .subscribe((v) => this.fg.patchValue(v));
    }
  }

  onSubmit(): void {
    if (this.editId) {
      const editRequirement = this.fg.value as Requirement;
      this.requirementService
        .editRequirement(this.editId, editRequirement)
        .subscribe(() => this.router.navigate(['/requirement-list']));
    } else {
      // prepare data for API
      const newRequirement = this.fg.value as Requirement;
      this.requirementService
        .addRequirement(newRequirement)
        .subscribe(() => this.router.navigate(['/requirement-list']));
    }
  }

  onBack(): void {
    this.router.navigate(['/requirement-list']);
  }

  confirmLeaveForm(): boolean {
    if (this.fg.touched) {
      return confirm('Leave form ?');
    }

    return true;
  }
}
