public with sharing class WorkTypeController {
    public WorkTypeController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<WorkType> getWorkTypes() {
        return [
            SELECT Id,Name FROM WorkType  LIMIT 200
       ];
    }
}