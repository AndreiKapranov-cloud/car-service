
import { LightningElement,wire,api} from 'lwc';
import SKILL_REQUIREMENT_OBJECT from '@salesforce/schema/SkillRequirement';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import WORK_TYPE from '@salesforce/schema/SkillRequirement.RelatedRecordId';
import SKILL from '@salesforce/schema/SkillRequirement.SkillId';
import SKILL_LEVEL from '@salesforce/schema/SkillRequirement.SkillLevel';
import getSkills from '@salesforce/apex/SkillController.getSkills';
import getWorkType from '@salesforce/apex/workTypeController.getWorkType';


export default class NewSkillRequirement extends LightningElement {
   
    skillData = [];
    skillRequired;
    skillLevel;
    @api workTypeRecordId;
    workTypes;
    error;

    @wire(getSkills) skills;

    handleChange(e) {

        if (e.target.name === "skillRequired") {
            this.skillRequired = this.template.querySelector('select.slds-select').value;
        } else if (e.target.name === "skillLevel") {
            this.skillLevel = e.target.value;
        }
      }

    // @wire(getWorkType, { workTypeId: '$workTypeRecordId' })
    // workTypes;
     


    // async getWorkTypeRecord() {
    //     try {
    //         this.workTypes = await getWorkType({ workTypeId: this.workTypeRecordId});
    //         this.error = undefined;
    //     } catch (error) {
    //         this.error = error;
    //         this.workType = undefined;
    //     }
    // }
    
    // get workTypeId() {
    //     return this.workTypeRecord.data.fields.Id.value;
    //   }
    
    //   get workTypeName() {
    //     return this.workTypeRecord.data.fields.Name.value;
    //   }

    async createSkillRequirement() {
    const fields = {};
    fields[WORK_TYPE.fieldApiName] = '08qdL0000000rXNQAY';
    fields[SKILL.fieldApiName] = this.skillRequired;
    fields[SKILL_LEVEL.fieldApiName] = this.skillLevel;




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
                title: 'Error creating Skill Requirement record',
                message: error,
                variant: 'error'
            })
        );
    }
    }}