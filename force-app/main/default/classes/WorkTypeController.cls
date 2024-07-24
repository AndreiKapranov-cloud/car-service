public with sharing class WorkTypeController {
    public WorkTypeController() {

    }
    @AuraEnabled()
    public static List<WorkType> getWorkTypes() {
        return [
            SELECT Id,Name FROM WorkType LIMIT 200
       ];
    }
   
    @AuraEnabled()
    public static WorkType createWorkTypeApexMethod(String workTypeName,String description,Decimal estimatedDuration,String durationType) {
       
        WorkType workTypeRecord = new WorkType();

        try{   

               workTypeRecord = new WorkType(Name = workTypeName,Description = description,EstimatedDuration = estimatedDuration,
               DurationType = durationType);
        
        insert workTypeRecord;
        
     } catch(Exception e) {
        
           System.debug('The following exception has occurred: ' + e.getMessage()); 
       
           throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
      }
      return workTypeRecord;
    }

    @AuraEnabled()
    public static List<Map<String, String>> getDurationTypePicklistValues() {
        List<Schema.PicklistEntry> entries = WorkType.DurationType.getDescribe().getPicklistValues();
        List<Map<String, String>> values = new List<Map<String, String>>();
        for (Schema.PicklistEntry entry : entries) {
            Map<String, String> valueMap = new Map<String, String>();
            valueMap.put('label', entry.getLabel());
            valueMap.put('value', entry.getValue());
            values.add(valueMap);
        }
        return values;
    }

 }
    