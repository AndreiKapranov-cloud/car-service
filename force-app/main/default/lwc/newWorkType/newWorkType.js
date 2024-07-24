import { LightningElement,wire } from 'lwc';
import getDurationTypePicklistValues from '@salesforce/apex/WorkTypeController.getDurationTypePicklistValues';
import createWorkTypeApexMethod from '@salesforce/apex/WorkTypeController.createWorkTypeApexMethod';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { createRecord } from 'lightning/uiRecordApi';
 import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import WORK_TYPE_OBJECT from '@salesforce/schema/WorkType';
// import WORK_TYPE_NAME_FIELD from '@salesforce/schema/WorkType.Name';
// import DESCRIPTION_FIELD from '@salesforce/schema/WorkType.Description';
// import ESTIMATED_DURATION_FIELD from '@salesforce/schema/WorkType.EstimatedDuration';
 import DURATION_TYPE_FIELD from '@salesforce/schema/WorkType.DurationType';
// import SHOULD_AUTO_CREATE_SERVICE_APPOINTMENT_FIELD from '@salesforce/schema/WorkType.ShouldAutoCreateSvcAppt';
const RECORD_TYPE_ID = '012000000000000AAA';

export default class NewWorkType extends LightningElement {
    
  
  
    workType;
    workTypeRecordList = [];
    
    workTypeName;


    picklistValues = [];
    name = '';
    description = '';
    estimatedDuration = '';
    durationType = '';
    shouldAutoCreateSvcAppt = false;

    showNewWorkTypeComponent = true;
    showNewSkillRequirementComponent = false;

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
     
      // @wire(getPicklistValues, {
      //   recordTypeId: RECORD_TYPE_ID,
      //   fieldApiName: DURATION_TYPE_FIELD,
      // })
      // getPicklistValuesForField({ data, error }) {
      //   if (error) {
      //     // TODO: Error handling
      //     console.log('error');
      //     console.error(error);
      //   } else if (data) {
      //     this.picklistValues = [...data.values];
      //   }
      // }
    


     connectedCallback(){
      getDurationTypePicklistValues()
        .then(result => {
          this.picklistValues = result;
          console.log('this.picklistValues: ', this.picklistValues);
        })
        .catch(zalupa =>{
            console.log(zalupa);
              this.error = zalupa.message;
              console.log('error createWorkType');
              console.log(zalupa);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error getting PickList values',
                        message: zalupa,
                        variant: 'error'
                    })
                );
          });
      }
      

        createWorkType() {

          console.log('createWorkType');
          createWorkTypeApexMethod(
            {
              workTypeName:this.name,
              description:this.description,
              estimatedDuration:this.estimatedDuration,
              durationType:this.durationType
            })
          .then(result => {
              console.log(result);
              console.log('ID: ', result.Id);
              this.workTypeObject = result;
              this.workTypeRecordId = result.Id;
              this.workTypeName = result.Name;
             
              console.log('workTypeObject = ' + this.workTypeObject);
             
              console.log('record.Name = ' + result.Name);
            
              this.showNewWorkTypeComponent = false;
              this.showNewSkillRequirementComponent = true;


              
              const toastEvent = new ShowToastEvent({
                  title:'Success!',
                  message:'Work Type Record is created Successfully!',
                  variant:'success'
              });
              this.dispatchEvent(toastEvent);
            })
            .catch(zalupa =>{
              console.error(zalupa);
                this.error = zalupa.message;
                console.log('error createWorkType');
                console.log(zalupa);
                  this.dispatchEvent(
                      new ShowToastEvent({
                          title: 'Error creating Work Type record',
                          message: zalupa,
                          variant: 'error'
                      })
                  );
            });
      }










       
      //   const fields = {};
       
      //   fields[WORK_TYPE_NAME_FIELD.fieldApiName] = this.name;
      //   fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
      //   fields[ESTIMATED_DURATION_FIELD.fieldApiName] = this.estimatedDuration;
      //   fields[DURATION_TYPE_FIELD.fieldApiName] = this.durationType;
      //   fields[SHOULD_AUTO_CREATE_SERVICE_APPOINTMENT_FIELD.fieldApiName] = this.shouldAutoCreateSvcAppt;

        
      //   const recordInput = { apiName: WORK_TYPE_OBJECT.objectApiName, fields:fields};
      //   try {
      //       const workType = createRecord(recordInput)
            
      //       .then(record => {
      //         console.log(record);
        
      //        console.log('record.Name = ' + record.fields.Name.value);
            
      //      this.workTypeName = record.fields.Name.value;
      //      this.workTypeObject = record;
      //      console.log('workTypeObject = ' + this.workTypeObject);
      //      console.log('workTypeName= ' + this.workTypeName);
      // //  //       this.newWorkTypeRecord = record;
            
      //     //    console.log('record = ' + record);
      //   //      console.log('newWorkTypeRecord = ' + this.newWorkTypeRecord);
      //         this.workTypeRecordId = record.id;
      //         this.showNewWorkTypeComponent = false;
      //         this.showNewSkillRequirementComponent = true;
      //       })
            
      //       this.dispatchEvent(
      //           new ShowToastEvent({
      //               title: 'Success',
      //               message: 'Work Type created',
      //               variant: 'success'
      //           })
      //       );
          
            
      //   } catch (error) {
      //     console.log('error createWorkType');
      //     console.log(error);
      //       this.dispatchEvent(
      //           new ShowToastEvent({
      //               title: 'Error creating Work Type record',
      //               message: error,
      //               variant: 'error'
      //           })
      //       );
            
      //   }
    
}