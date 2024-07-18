public with sharing class workTypeController {
    public workTypeController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<WorkType> getWorkType(Id workTypeId) {
        return [
            SELECT Id,Name
            FROM WorkType where Id =: workTypeId
       ];
    }
}