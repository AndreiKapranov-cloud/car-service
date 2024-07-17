import { LightningElement,wire,track} from 'lwc';
import SKILL_REQUIREMENT_OBJECT from '@salesforce/schema/SkillRequirement';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import WORK_TYPE from '@salesforce/schema/SkillRequirement.RelatedRecordId';
import SKILL from '@salesforce/schema/SkillRequirement.SkillId';
import SKILL_LEVEL from '@salesforce/schema/SkillRequirement.SkillLevel';
import getSkills from '@salesforce/apex/SkillController.getSkills';


export default class NewSkillRequirement extends LightningElement {
   
    @wire(getSkills) skills;
    skillRequired;
    skillLevel;
    workType;

    handleChange(e) {
        if (e.target.name === "workType") {
          this.workType = e.target.value;
        } else if (e.target.name === "skillRequired") {
            this.skillRequired = e.target.value;
        } else if (e.target.name === "skillLevel") {
          this.skillLevel = e.target.value;
        }
      }
    
        async createSkillRequirement() {
        const fields = {};
        fields[WORK_TYPE.fieldApiName] = '08qdL0000000p8zQAA';
        fields[SKILL.fieldApiName] = this.skillRequired;
       // fields[SKILL_LEVEL.fieldApiName] = this.skillLevel;
        

        const recordInput = { apiName: SKILL_REQUIREMENT_OBJECT.objectApiName, fields:fields};
        try {
            const skillRequirement = await createRecord(recordInput);
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Skill Requirement created',
                    variant: 'success'
                })
            );
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error,
                    variant: 'error'
                })
            );
        }
      }}