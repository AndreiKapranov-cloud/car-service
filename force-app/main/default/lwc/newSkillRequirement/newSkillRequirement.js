
import { LightningElement,wire,api} from 'lwc';
import SKILL_REQUIREMENT_OBJECT from '@salesforce/schema/SkillRequirement';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import WORK_TYPE from '@salesforce/schema/SkillRequirement.RelatedRecordId';
import SKILL from '@salesforce/schema/SkillRequirement.SkillId';
import SKILL_LEVEL from '@salesforce/schema/SkillRequirement.SkillLevel';
import getSkills from '@salesforce/apex/SkillController.getSkills';


export default class NewSkillRequirement extends LightningElement {
   
    skillData = [];
    skillRequired;
    skillLevel;
    @api workTypeRecordId;
    @api workTypeName;
    workTypeId;
    error;
    showParentComponent = true;
    showChildComponent = false;
    

    @wire(getSkills) skills;

    handleChange(e) {

        if (e.target.name === "skillRequired") {
            this.skillRequired = this.template.querySelector('select.slds-select').value;
        } else if (e.target.name === "skillLevel") {
            this.skillLevel = e.target.value;
        }
      }


    //   @wire(getRecord, { recordId: "$workTypeRecordId", fields })
    //   workType;

    //   get workTypeName() {
    //     return getFieldValue(this.workType.data, NAME_FIELD);
        
    //   }




    //   @wire(getWorkType,{workTypeId:'$workTypeRecordId'})
    //   getWType({ error, data }) {

    //     if (data) {

    //       this.workTypeName = data;
    //       console.log('Work Type name from apex = ' + this.workTypeName);
    //       this.error = undefined;
    //   } else if (error) {
    //       this.error = error;
    //       this.workTypeName = undefined; 
    //       console.log('Something went wrong:', error);
    //       console.error('e.message => ' + e.message );
    //     }
    //   }
//     renderedCallback() {

//         this.getWorkType(this.workTypeRecordId);

//  }




    // @wire(getWorkType,{workTypeId:'$workTypeRecordId'})
    // workType;
    
    // @wire(getWorkType, { workTypeId: '$workTypeRecordId' })   //из-за этой хуйни перестаёт всё работать
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
   // this.timeoutId = setTimeout(()=>this.doExpensiveThing(), 500);
    console.log('Namenamename = ' + this.workTypeName);
    console.log('final workTypeRecordId for skill req = ' + this.workTypeRecordId);//без этой строчки не работает
    const fields = {};
    fields[WORK_TYPE.fieldApiName] = this.workTypeRecordId;// '08qdL0000000rsLQAQ';//workTypes[0].data.Id;//'08qdL0000000rXNQAY';
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
    this.showParentComponent = false;
    this.showChildComponent = true;
    }
  }
//  async renderedCallback() {
//     this.workTypeName = await getWorkTypeName({ workTypeId: this.workTypeRecordId });
//         console.log('final name for Work Type = ' + this.workTypeName);
//         this.error = undefined;
//     } catch (error) {
//         this.error = error;
//         this.workTypeName = undefined;
//     }

  

