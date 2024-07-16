import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import WORK_TYPE_OBJECT from '@salesforce/schema/WorkType';
import WORK_TYPE_NAME_FIELD from '@salesforce/schema/WorkType.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/WorkType.Description';
import ESTIMATED_DURATION_FIELD from '@salesforce/schema/WorkType.EstimatedDuration';
import DURATION_TYPE_FIELD from '@salesforce/schema/WorkType.DurationType';
import SHOULD_AUTO_CREATE_SERVICE_APPOINTMENT_FIELD from '@salesforce/schema/WorkType.ShouldAutoCreateSvcAppt';

export default class WorkTypeName extends LightningElement {

     name = '';
     description = '';
     estimatedDuration = '';
     durationType = 'hours';
     shouldAutoCreateSvcAppt = 'true';

     
     handleChange(e) {
        if (e.target.name === "name") {
          this.name = e.target.value;
        } else if (e.target.name === "description") {
          this.description = e.target.value;
        } else if (e.target.name === "estimatedDuration") {
          this.estimatedDuration = e.target.value;
        }else if (e.target.name === "durationType") {
            this.durationType = e.target.value;
        }else if (e.target.name === "shouldAutoCreateSvcAppt") {
            this.shouldAutoCreateSvcAppt = e.target.value;
        }
      }
     

    //  handleButtonClick() {
    //     const recordInput = {
    //         apiName: WORK_TYPE_OBJECT.objectApiName,
    //         fields: {
    //             [WORK_TYPE_NAME_FIELD.fieldApiName] : 'ACME'
    //         }
    //     };
    //     createRecord(recordInput)
    //         .then(workType => {
    //             // code to execute if create operation is successful
    //         })
    //         .catch(error => {
    //             // code to execute if create operation is not successful
    //         });
    //  }
        async createWorkType() {
        const fields = {};
        fields[WORK_TYPE_NAME_FIELD.fieldApiName] = this.name;
      //  fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
         fields[ESTIMATED_DURATION_FIELD.fieldApiName] = this.estimatedDuration;
        // fields[DURATION_TYPE_FIELD.fieldApiName] = this.durationType;
        // fields[SHOULD_AUTO_CREATE_SERVICE_APPOINTMENT_FIELD.fieldApiName] = this.shouldAutoCreateSvcAppt;






        const recordInput = { apiName: WORK_TYPE_OBJECT.objectApiName, fields:fields};
        try {
            const workType = await createRecord(recordInput);
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created',
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
    }
}