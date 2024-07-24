
import { LightningElement,wire,api} from 'lwc';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import WORK_ORDER_NUMBER from "@salesforce/schema/WorkOrder.WorkOrderNumber";
import getWorkTypes from '@salesforce/apex/WorkTypeController.getWorkTypes';
import { getPicklistValues } from 'lightning/uiObjectInfoApi'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import WORK_ORDER_LINE_ITEM_OBJECT from '@salesforce/schema/WorkOrderLineItem';
import STATUS from '@salesforce/schema/WorkOrderLineItem.Status';
import WORK_ORDER from '@salesforce/schema/WorkOrderLineItem.WorkOrderId';
import WORK_TYPE from '@salesforce/schema/WorkOrderLineItem.WorkTypeId';
import DESCRIPTION from '@salesforce/schema/WorkOrderLineItem.Description';
const WORK_ORDER_FIELDS = [WORK_ORDER_NUMBER];
const RECORD_TYPE_ID = '012000000000000AAA';

export default class NewWorkOrderLineItem extends LightningElement {
    
    itemStatusPicklistValues = [];
    status;
    @api workOrderRecordId;
    workTypeId;
    description;
  
    @wire(getWorkTypes)workTypes;

    @wire(getRecord, { recordId: "$workOrderRecordId", WORK_ORDER_FIELDS })
    workOrder;

    get workOrderNumber() {
        return getFieldValue(this.workOrder.data, WORK_ORDER_NUMBER);
      }

   
    handleChange(e) {

        if (e.target.name === "status") {
            this.status = e.target.value;
        } else if (e.target.name === "workType") {
            this.workTypeId = this.template.querySelector('select.slds-select').value;
        } else if (e.target.name === "description") {
            this.description = e.target.value;
        }
      }

    @wire(getPicklistValues, {
    recordTypeId: RECORD_TYPE_ID,
    fieldApiName: STATUS,
    })
    getPicklistValuesForField({ data, error }) {
    if (error) {
        // TODO: Error handling
        console.error(error)
    } else if (data) {
        this.itemStatusPicklistValues = [...data.values];
      }
    }


   
        async createWorkOrderLineItem() {
   
        
        const fields = {};
      
        console.log('status = ' + this.status);
        console.log('workOrder = ' + this.workOrderId);
        console.log('workTypeId = ' + this.workTypeId);
        console.log('description = ' + this.description);
        fields[STATUS.fieldApiName] = this.status;
        fields[WORK_ORDER.fieldApiName] = this.workOrderRecordId;
        fields[WORK_TYPE.fieldApiName] = this.workTypeId;
        fields[DESCRIPTION.fieldApiName] = this.description;
     
    const recordInput = { apiName: WORK_ORDER_LINE_ITEM_OBJECT.objectApiName, fields:fields};
    try {
        const workOrder = await createRecord(recordInput)

        .then(record => {
         
              this.workOrderLineItemRecordId = record.id;
          
         })

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Work Order Line Item created',
                variant: 'success'
            })
        );
    } catch (error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating Work Order Line Item record',
                message: error,
                variant: 'error'
            })
        );
    }
  }
}
