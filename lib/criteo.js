'use strict';
/**
 * Criteo Library
 */

var Client = require('./client');

class Criteo extends Client {

    /**
     * Gets the account information
     * @access public
     * @param callback {function}
     */
    getAccount(callback) {
        this.makeAuthenticatedRequest('getAccount', null, callback);
    }

    /**
     * Gets the budget information
     * @access public
     * @access budgetSelector {object} the parameters for the body
     * @param callback {function}
     */
    getBudgets(budgetSelector, callback) {
        this.makeAuthenticatedRequest('getBudgets', {budgetSelector: budgetSelector}, callback);
    }

    /**
     * Gets the campaign information
     * @access public
     * @access campaignSelector {object} the parameters for the body
     * @param callback {function}
     */
    getCampaigns(campaignSelector, callback) {
        this.makeAuthenticatedRequest('getCampaigns', {campaignSelector: campaignSelector}, callback);
    }

    /**
     * Gets the catalog names
     * @access public
     * @param callback {function}
     */
    getCatalogsNames(callback) {
        this.makeAuthenticatedRequest('getCatalogsNames', null, callback);
    }

    /**
     * Gets the campaign information
     * @access public
     * @access categorySelector {object} the parameters for the body
     * @param callback {function}
     */
    getCategories(categorySelector, callback) {
        this.makeAuthenticatedRequest('getCategories', {categorySelector: categorySelector}, callback);
    }

    /**
     * Gets the job status
     * @access public
     * @access jobId {number} the job id to get the status of
     * @param callback {function}
     */
    getJobStatus(jobId, callback) {
        this.makeAuthenticatedRequest('getJobStatus', {jobID: jobId}, callback);
    }

    /**
     * Gets the report download url
     * @access public
     * @access jobId {number} the job id to get the status of
     * @param callback {function}
     */
    getReportDownloadUrl(jobId, callback) {
        this.makeAuthenticatedRequest('getReportDownloadUrl', {jobID: jobId}, callback);
    }

    /**
     * Gets the last time statistics were updated
     * @access public
     * @access jobId {number} the job id to get the status of
     * @param callback {function}
     */
    getStatisticsLastUpdate(callback) {
        this.makeAuthenticatedRequest('getStatisticsLastUpdate', callback);
    }

    /**
     * modifies campaigns
     * @access public
     * @access listOfCampaignMutates {array} the array of campaigns to mutate
     * @param callback {function}
     */
    mutateCampaigns(listOfCampaignMutates, callback) {
        this.makeAuthenticatedRequest('mutateCampaigns', {listOfCampaignMutates: listOfCampaignMutates}, callback);
    }

    /**
     * modifies the categories for criteo
     * @access public
     * @access listofCategoryMutates {array} the array of categories to mutate
     * @param callback {function}
     */
    mutateCategories(listofCategoryMutates, callback) {
        this.makeAuthenticatedRequest('mutateCategories', {listofCategoryMutates: listofCategoryMutates}, callback);
    }


    /**
     * Schedules a report Job
     * @access public
     * @access job {object} the report job to add to the schedule
     * @param callback {function}
     */
    scheduleReportJob(job, callback) {
        this.makeAuthenticatedRequest('scheduleReportJob', {reportJob: job}, callback);
    }

    /**
     * Schedules a report Job
     * @access public
     * @access job {object} the report job to add
     * @param callback {function}
     */
    scheduleTransactionReportJob(job, callback) {
        this.makeAuthenticatedRequest('scheduleTransactionReportJob', {reportJob: job}, callback);
    }

}

module.exports = Criteo;
