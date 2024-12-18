import express from 'express'

import { apiDocs } from './apiDocs'
import { Repositories } from '../../../application/port'

import { deleteMultiOperationPlan } from '../../../interface/routes/operationPlan/deleteMultiOperationPlan'
import { searchOperationPlansByProjects } from '../../../interface/routes/operationPlan/searchOperationPlansByProjects'
import { searchOperationPlansByPersonnels } from '../../../interface/routes/operationPlan/searchOperationPlansByPersonnels'
import createOperationPlan from './../../../interface/routes/operationPlan/createOperationPlan'
import { findAllRoles } from '../../../interface/routes/options/role/findAllRoles'
import { findAllPersonnel } from '../../../interface/routes/options/personnel/findAllPersonnel'
import { searchExistenceOfOperation } from '../../../interface/routes/options/personnel/searchExistenceOfOperation'
import { findByPersonnelIDRoute } from '../../../interface/routes/options/personnelPrice/findByPersonnelIDRoute'
import { findAllProjects } from '../../../interface/routes/options/project/findAllProjects'
import { findAllPartnerCompany } from '../../../interface/routes/options/partnerCompany/findAllPartnerCompany'
import { createPartnerCompany } from '../../../interface/routes/options/partnerCompany/createPartnerCompany'
import { deletePartnerCompanies } from '../../../interface/routes/options/partnerCompany/deletePartnerCompanies'
import { searchOperationCostPlansByProjects } from '../../../interface/routes/operationCostPlan/searchOperationCostPlanByProject'
import { searchOperationCosts } from '../../../interface/routes/operationCost/searchOperationCosts'
import { deleteOperationCosts } from '../../../interface/routes/operationCost/deleteOperationCosts'
import { createOperationCost } from '../../../interface/routes/operationCost/createOperationCost'
import { createProjects } from '../../../interface/routes/options/project/createProjectsRoute'
import { createPersonnel } from './../../../interface/routes/options/personnel/createPersonnel'
import { deleteProjects } from '../../../interface/routes/options/project/deleteProjectsRoute'
import { deletePersonnels } from '../../../interface/routes/options/personnel/deletePersonnels'
import { getAllBusinessDaysRoute } from '../../../interface/routes/businessDays/getAllBusinessDaysRoute'
import { createBusinessDaysRoute } from '../../../interface/routes/businessDays/createBusinessDaysRoute'
import { createPersonnelPriceRoute } from '../../../interface/routes/options/personnelPrice/createPersonnelPriceRoute'
import { deletePersonnelPriceRoute } from '../../../interface/routes/options/personnelPrice/deletePersonnelPriceRoute'
import { deleteBusinessDaysRoute } from '../../../interface/routes/businessDays/deleteBusinessDays.Route'
import { searchWbsCosts } from '../../../interface/routes/wbs/searchWbsCosts'
/**
 *
 * @param repository
 * @returns  express.Router
 */
export const createRouter = (repository: Repositories): express.Router => {
  // create a new router
  const router = express.Router()
  /*
   *******apiDocs**********
   */
  // add the Swagger route to the router
  apiDocs(router)

  /********Operation Plan***********/
  // add the operation plan routes to the router
  searchOperationPlansByPersonnels(router, repository.operationPlanRepository)
  deleteMultiOperationPlan(
    router,
    repository.operationPlanRepository,
    repository.operationCostRepository
  )
  searchOperationPlansByProjects(router, repository.operationPlanRepository)
  createOperationPlan(router, repository.operationPlanRepository)

  /********Role***********/
  // add the role routes to the router
  findAllRoles(router, repository.roleRepository)

  /********Project***********/
  // add the project routes to the router
  findAllProjects(
    router,
    repository.projectRepository,
    repository.operationCostRepository
  )
  createProjects(router, repository.projectRepository, repository.wbsRepository)
  deleteProjects(router, repository.projectRepository)

  /********Operation Cost Plan**********/
  // add the operation cost plan routes to the router
  searchOperationCostPlansByProjects(
    router,
    repository.operationCostPlanRepository
  )

  /********Partner Companies***********/
  // add the partner company routes to the router
  findAllPartnerCompany(router, repository.partnerCompanyRepository)
  createPartnerCompany(
    router,
    repository.partnerCompanyRepository,
    repository.salesManRepository
  )
  deletePartnerCompanies(router, repository.partnerCompanyRepository)

  /********Personnel***********/
  // add the personnel routes to the router
  findAllPersonnel(router, repository.personnelRepository)
  createPersonnel(router, repository.personnelRepository)

  // * PersonnelPrice APIs
  // add the personnel price routes to the router
  findByPersonnelIDRoute(router, repository.personnelPriceRepository)
  createPersonnelPriceRoute(
    router,
    repository.personnelPriceRepository,
    repository.operationCostRepository
  )
  deletePersonnelPriceRoute(router, repository.personnelPriceRepository)
  searchExistenceOfOperation(
    router,
    repository.personnelRepository,
    repository.operationPlanRepository,
    repository.operationCostRepository
  )

  /********Operation***********/
  // add the operation routes to the router
  deletePersonnels(router, repository.personnelRepository)
  /*
   *******Operation Cost**********
   */
  // add the operation cost routes to the router
  searchOperationCosts(router, repository.operationCostRepository)
  deleteOperationCosts(router, repository.operationCostRepository)
  createOperationCost(router, repository.operationCostRepository)

  // * Business Days APIs
  // add the business days routes to the router
  getAllBusinessDaysRoute(router, repository.businessDaysRepository)
  createBusinessDaysRoute(router, repository.businessDaysRepository)
  deleteBusinessDaysRoute(router, repository.businessDaysRepository)

  /********WBS***********/
  searchWbsCosts(router, repository.wbsRepository)

  return router
}
