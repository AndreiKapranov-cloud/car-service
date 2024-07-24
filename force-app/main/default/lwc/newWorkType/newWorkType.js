import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import WORK_TYPE_OBJECT from '@salesforce/schema/WorkType';
import WORK_TYPE_NAME_FIELD from '@salesforce/schema/WorkType.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/WorkType.Description';
import ESTIMATED_DURATION_FIELD from '@salesforce/schema/WorkType.EstimatedDuration';
import DURATION_TYPE_FIELD from '@salesforce/schema/WorkType.DurationType';
import SHOULD_AUTO_CREATE_SERVICE_APPOINTMENT_FIELD from '@salesforce/schema/WorkType.ShouldAutoCreateSvcAppt';
const RECORD_TYPE_ID = '012000000000000AAA';

export default class NewWorkType extends LightningElement {
    
  
  
  
     workTypeRecordList = [];
    
     workTypeName;


     picklistValues = [];
     name = '';
     description = '';
     estimatedDuration = '';
     durationType = '';
     shouldAutoCreateSvcAppt = false;
     showParentComponent = true;
     showChildComponent = false;
     workTypeRecordId;
     timeoutId;
    
     
     handleChange(e) {
      console.log('handleChange');
        if (e.target.name === "name") {
          this.name = e.target.value;
          console.log('name = ' + this.name);
        } else if (e.target.name === "description") {
          this.description = e.target.value;
        } else if (e.target.name === "estimatedDuration") {
          this.estimatedDuration = e.target.value;
        }else if (e.target.name === "durationType") {
            this.durationType = e.target.value;
        }else if (e.target.name === "shouldAutoCreateSvcAppt") {
            this.shouldAutoCreateSvcAppt = e.target.checked;
        }
      }
     
      @wire(getPicklistValues, {
        recordTypeId: RECORD_TYPE_ID,
        fieldApiName: DURATION_TYPE_FIELD,
      })
      getPicklistValuesForField({ data, error }) {
        if (error) {
          // TODO: Error handling
          console.log('error');
          console.error(error);
        } else if (data) {
          this.picklistValues = [...data.values];
        }
      }
    
        createWorkType() {
        console.log('createWorkType');
       
        const fields = {};
       
        fields[WORK_TYPE_NAME_FIELD.fieldApiName] = this.name;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
        fields[ESTIMATED_DURATION_FIELD.fieldApiName] = this.estimatedDuration;
        fields[DURATION_TYPE_FIELD.fieldApiName] = this.durationType;
        fields[SHOULD_AUTO_CREATE_SERVICE_APPOINTMENT_FIELD.fieldApiName] = this.shouldAutoCreateSvcAppt;

        
        const recordInput = { apiName: WORK_TYPE_OBJECT.objectApiName, fields:fields};
        try {
            const workType = createRecord(recordInput)
            
            .then(record => {
              console.log('record = ' + record);
            //  console.log('record = ' + record);
             // this.workTypeName = record.data.fields.name.value; 
                
       //       console.log('workTypeRecordName = ' + this.workTypeName);
            //  this.workTypeName = this.record.name;
              // console.log('record = ' + record);
              // console.log('record = ' + record.data);
              // console.log('record = ' + record.data.fields.name);
              // console.log('record = ' + record.data.fields.Name);
              // console.log('record = ' + record.data.fields.name.value);
              // console.log('record = ' + record.data.fields.Name.value);



       //       this.newWorkTypeRecord = record;
            
          //    console.log('record = ' + record);
        //      console.log('newWorkTypeRecord = ' + this.newWorkTypeRecord);
              this.workTypeRecordId = record.id;
         
            })
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Work Type created',
                    variant: 'success'
                })
            );
            this.showNewWorkTypeComponent = false;
            this.showNewSkillRequirementComponent = true;
            
        } catch (error) {
          console.log('error createWorkType');
          console.log(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating Work Type record',
                    message: error,
                    variant: 'error'
                })
            );
            
        }
        
      
    }
  }
