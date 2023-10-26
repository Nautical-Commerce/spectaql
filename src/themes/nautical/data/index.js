// THIS IS AN EXPERIMENTAL API AND IT COULD CHANGE AT ANY TIME IN A BREAKING
// MANNER BEFORE A MAJOR RELEASE.
//
// USE AT YOUR OWN RISK.
const { Microfiber: IntrospectionManipulator } = require('microfiber')

function sortByName(a, b) {
  if (a.name > b.name) {
    return 1
  }
  if (a.name < b.name) {
    return -1
  }

  return 0
}

module.exports = ({
  // The Introspection Query Response after all the augmentation and metadata directives
  // have been applied to it
  introspectionResponse,
  // All the options that are specifically for the introspection related behaviors, such a this area.
  introspectionOptions,
  // A GraphQLSchema instance that was constructed from the provided introspectionResponse
  graphQLSchema: _graphQLSchema,
  // All of the SpectaQL options in case you need them for something.
  allOptions: _allOptions,
}) => {
  const introspectionManipulator = new IntrospectionManipulator(
    introspectionResponse,
    // microfiberOptions come from converting some of the introspection options to a corresponding
    // option for microfiber via the `src/index.js:introspectionOptionsToMicrofiberOptions()` function
    introspectionOptions?.microfiberOptions,
  )

  const queryType = introspectionManipulator.getQueryType()
  const mutationType = introspectionManipulator.getMutationType()
  const normalTypes = introspectionManipulator.getAllTypes({
    includeQuery: false,
    includeMutation: false,
    includeSubscription: false,
  })

  //define arrays for each section
  const appTokenSection = [
    'appTokenCreate',
    'appTokenDelete',
    'appTokenVerify',
  ];
  const userTokenSection = [
    'tokenCreate',
    'tokensDeactivateAll',
    'tokenRefresh',
    'tokenVerify',
  ];
  const attributesSection = [
    'attribute',
    'attributes',
    'attributeAssign',
    'attributeBulkDelete',
    'attributeCreate',
    'attributeDelete',
    'attributeUnassign',
    'attributeUpdate'
  ];  
  const attributeValuesSection = [
    'attributeValueBulkCreate',
    'attributeValueBulkDelete',
    'attributeValueCreate',
    'attributeValueDelete',
    'attributeValueUpdate',
    'attributeValuesReorder'
  ];  

  const categoriesSection = [
    'allCategories',
    'category',
    'categories',
    'categoryBulkDelete',
    'categoryCreate',
    'categoryDelete',
    'categoryUpdate'
  ];
  
  const collectionsSection = [
    'collection',
    'collections',
    'collectionAddProducts',
    'collectionAddVariants',
    'collectionBulkDelete',
    'collectionBulkPublish',
    'collectionCreate',
    'collectionDelete',
    'collectionReorderProducts',
    'collectionRemoveProducts',
    'collectionRemoveVariants',
    'collectionUpdate',
    'homepageCollectionUpdate'
  ];
  
  const digitalContentSection = [
    'digitalContent',
    'digitalContents',
    'digitalContentCreate',
    'digitalContentDelete',
    'digitalContentUpdate',
    'digitalContentUrlCreate'
  ];
  
  const featuresSection = [
    'featureCreate',
    'featureUpdate',
    'featureDelete',
    'productTypeFeatureCreate',
    'productTypeFeatureDelete',
    'productTypeFeatureUpdate'
  ];
  
  const groupedProductsSection = [
    'groupedProductAddProducts',
    'groupedProductRemoveProducts'
  ];
  
  const importAndExportSection = [
    'availableImportSources',
    'catalogImportProcess',
    'catalogImportProcesses',
    'catalogImport',
    'exportFile',
    'exportFiles',
    'catalogExport'
  ];
  
  const productsSection = [
    'product',
    'products',
    'productBulkCategoryUpdate',
    'productBulkDelete',
    'productBulkPublish',
    'productCreate',
    'productDelete',
    'productReorderVariants',
    'productSetAvailabilityForPurchase',
    'productUpdate',
    'productsExport',
    'productsImport',
    'productImageBulkDelete',
    'productImageCreate',
    'productImageDelete',
    'productImageReorder',
    'productImageUpdate',
    'locationGeocode',
    'locationSearch',
    'productLocationCreate',
    'productLocationDelete',
    'productLocationUpdate',
    'productSetLocationType'
  ];
  
  const productTypesSection = [
    'productType',
    'productTypes',
    'productTypeBulkDelete',
    'productTypeCreate',
    'productTypeDelete',
    'productTypeReorderAttributes',
    'productTypeUpdate'
  ];
  
  const variantsSection = [
    'productVariant',
    'productVariants',
    'productVariantBulkCreate',
    'productVariantBulkDelete',
    'productVariantCreate',
    'productVariantDelete',
    'productVariantUpdate',
    'productVariantSetDefault',
    'productVariantImageAssign',
    'productVariantImageUnassign'
  ];  

  const checkoutSection = [
    'checkout',
    'checkouts',
    'checkoutCreate',
    'checkoutPaymentCreate',
    'checkoutBillingAddressUpdate',
    'checkoutComplete',
    'checkoutConvertToNauticalQuoteOrder',
    'checkoutDelete',
    'checkoutEmailUpdate',
    'checkoutLinePriceOverride',
    'checkoutNoteUpdate',
    'checkoutSetTransactionCurrency',
    'checkoutShippingAddressUpdate',
    'checkoutLine',
    'checkoutLines',
    'checkoutLinesAdd',
    'checkoutLineDelete',
    'checkoutLinesUpdate',
    'checkoutCustomerAttach',
    'checkoutCustomerDetach',
    'checkoutSellerShippingMethodsBulkUpdate',
    'checkoutSellerShippingMethodsClear',
    'checkoutSellerShippingMethodsUpdate',
    'checkoutAddPromoCode',
    'checkoutRemovePromoCode'
  ];
  const creditLimitsSection = [
    'creditLimit',
    'creditLimits',
    'userCreditLimitUpdate'
  ];
  const customersSection = [
    'customers',
    'customerBulkDelete',
    'customerCreate',
    'customerDelete',
    'customerUpdate',
    'customersExport'
  ];
  const currencySection = [
    'currencies',
    'exchangeRatesRefresh'
  ];
  const fulfillmentSection = [
    'orderDeclineFulfillment',
    'orderFulfill',
    'orderFulfillmentCancel',
    'orderFulfillmentCreateLabel',
    'orderFulfillmentUpdateTracking',
    'orderMarkAsDelivered'
  ];
  const invoicesSection = [
    'invoiceCreate',
    'invoiceDelete',
    'invoiceRequest',
    'invoiceRequestDelete',
    'invoiceSendNotification',
    'invoiceUpdate'
  ];
  const ordersSection = [
    'nauticalOrders',
    'nauticalOrder',
    'nauticalOrdersTotal',
    'nauticalOrderByToken',
    'nauticalSuborders',
    'order',
    'orderByToken',
    'orders',
    'ordersTotal',
    'draftOrders',
    'nauticalDraftOrders',
    'quoteOrders',
    'nauticalQuoteOrders',
    'nauticalQuoteOrderByToken',
    'nauticalOrderAddNote',
    'nauticalOrderUpdateApplyVoucherCode',
    'nauticalOrderUpdateDeleteDiscount',
    'nauticalOrderCancel',
    'nauticalOrderCapture',
    'nauticalOrderChannelUpdate',
    'nauticalOrderLineBulkCancel',
    'nauticalOrderMarkAsPaid',
    'nauticalOrderPaymentCreate',
    'nauticalOrderRefund',
    'nauticalOrderReplaceOrderLine',
    'nauticalOrderUpdateShipping',
    'nauticalOrderUpdate',
    'nauticalOrderVoid',
    'orderAddNote',
    'orderBulkCancel',
    'orderCancel',
    'orderCapture',
    'orderChannelUpdate',
    'orderFeeCreate',
    'orderFeeDelete',
    'orderMarkAsPaid',
    'orderPayoutStatusUpdate',
    'orderRefund',
    'orderUpdateShipping',
    'orderUpdate',
    'orderVoid',
    'ordersMapToNauticalOrder',
    'draftOrderBulkDelete',
    'draftOrderComplete',
    'draftOrderCreate',
    'draftOrderDelete',
    'draftOrderLineDelete',
    'draftOrderLinePriceOverride',
    'draftOrderLineUpdate',
    'draftOrderLinesBulkDelete',
    'draftOrderLinesCreate',
    'draftOrderSetTransactionCurrency',
    'draftOrderUpdate',
    'nauticalDraftOrderBulkDelete',
    'nauticalDraftOrderComplete',
    'nauticalDraftOrderCreate',
    'nauticalDraftOrderDelete',
    'nauticalDraftOrderLineDelete',
    'nauticalDraftOrderLinePriceOverride',
    'nauticalDraftOrderLineUpdate',
    'nauticalDraftOrderLinesBulkDelete',
    'nauticalDraftOrderLinesCreate',
    'nauticalDraftOrderSetTransactionCurrency',
    'nauticalDraftOrderUpdate',
    'nauticalQuoteOrderCancel',
    'nauticalQuoteOrderSendToCustomer',
    'bidAccept',
    'bidCreate',
    'bidReject',
    'orderOfferConvertToNauticalQuoteOrder'
  ];
  const paymentsSection = [
    'payment',
    'payments',
    'getClientSecret',
    'paymentCapture',
    'paymentRefund',
    'paymentVoid'
  ];
  
  const refundsSection = [
    'refund',
    'refunds',
    'refundsChangeStatus',
    'refundCreate',
    'refundsDelete',
    'refundUpdate',
    'refundLinesAdd',
    'refundLinesDelete',
    'refundLinesUpdate',
    'refundPaymentsAdd',
    'refundPaymentsDelete',
    'refundPaymentsUpdate'
  ];
  
  const returnsSection = [
    'returns',
    'fulfillmentBulkReturn',
    'nauticalOrderReturnFromStorefrontNotification',
    'nauticalOrderReturnNotification',
    'orderFulfillmentReturn',
    'orderReturnNotification',
    'vendorOrderReturnFromStorefrontNotification'
  ];
  
  const taxesSection = [
    'avalaraRequestLogs',
    'customerTaxCertificates',
    'taxExemptCodes',
    'taxTypes',
    'nauticalOrderRefreshTaxes'
  ];
  
  const wishlistSection = [
    'wishlistItemsByName',
    'wishlistAddProduct',
    'wishlistAddVariant',
    'wishlistCreateForBuyer',
    'wishlistCreate',
    'wishlistDelete',
    'wishlistItemUpdate',
    'wishlistRemoveProduct',
    'wishlistRemoveVariant',
    'wishlistSetDefault',
    'wishlistUpdate'
  ];  
  const affiliatesSection = [
    'affiliate',
    'affiliates',
    'affiliateCreate',
    'affiliateUpdate',
    'affiliateDelete',
    'affiliateAvatarUpdate',
    'affiliateBulkDelete',
    'affiliateCodes',
    'affiliateCodeCreate',
    'affiliateCodeSetActive',
    'affiliateCodeBulkSetActive',
    'affiliateCodeUse',
    'affiliateCodeChannelUpdate'
  ];
  
  const agreementsSection = [
    'agreement',
    'agreements',
    'agreementBulkDelete',
    'agreementBulkPublish',
    'agreementCommissionCreate',
    'agreementCommissionDelete',
    'agreementCreate',
    'agreementDelete',
    'agreementFeeCreate',
    'agreementFeeDelete',
    'agreementUpdate'
  ];
  
  const payoutsSection = [
    'getPayoutGateways',
    'payout',
    'payouts',
    'payoutBulkArchive',
    'payoutCreate',
    'payoutDatesUpdate',
    'payoutStatusUpdate',
    'payoutUpdate',
    'vendorPayout',
    'vendorPayoutList',
    'vendorPayouts',
    'vendorPayoutNoteAdd',
    'vendorPayoutNoteUpdate',
    'vendorPayoutOnboardingLinkRequest',
    'vendorPayoutStatusUpdate',
    'vendorPayoutsBulkExclude',
    'vendorPayoutsBulkInclude',
    'vendorPayoutsBulkProcess'
  ];
  
  const sellersSection = [
    'seller',
    'sellers',
    'newSellers',
    'sellerAgreement',
    'sellerCommissions',
    'sellerDetailCards',
    'sellerEvents',
    'sellerListCards',
    'sellerName',
    'sellerOrders',
    'sellerUser',
    'sellerUsers',
    'sellerAddressCreate',
    'sellerAddressDelete',
    'sellerAddressSetDefault',
    'sellerAddressUpdate',
    'sellerAgreementAcknowledge',
    'sellerDataCreate',
    'sellerDataUpdate',
    'sellerLogoUpdate',
    'sellerNoteCreate',
    'sellerOnboardingChecklistComplete',
    'sellerOwnerDelete',
    'sellerSettingsUpdate',
    'sellerShellCreate',
    'sellerUserMappingCreate',
    'sellerWithOwnerCreate'
  ];  
  const shippingZonesSection = [
    'shippingZone',
    'shippingZones',
    'shippingZoneBulkDelete',
    'shippingZoneCreate',
    'shippingZoneDelete',
    'shippingZoneUpdate',
    'shippingPriceBulkDelete',
    'shippingPriceCreate',
    'shippingPriceDelete',
    'shippingPriceUpdate'
  ];
  const stocksSection = [
    'stock',
    'stocks',
    'productVariantStocksCreate',
    'productVariantStocksDelete',
    'productVariantStocksUpdate'
  ];
  const warehousesSection = [
    'warehouse',
    'warehouses',
    'warehouseCreate',
    'warehouseDelete',
    'warehouseUpdate'
  ];
  const priceBooksSection = [
    'priceBook',
    'priceBooks',
    'priceBookBulkDelete',
    'priceBookCreate',
    'priceBookDelete',
    'priceBookUpdate'
  ];
  const priceBookProductTypesSection = [
    'priceBookProductTypes',
    'priceBookProductTypesHistory',
    'priceBookProductTypeBulkDelete',
    'priceBookProductTypeCreate',
    'priceBookProductTypeDelete',
    'priceBookProductTypeUpdate'
  ];
  const priceBookProductsSection = [
    'priceBookProducts',
    'priceBookProductsHistory',
    'priceBookProductUpdate',
    'priceBookProductBulkDelete',
    'priceBookProductCreate',
    'priceBookProductDelete',
  ];
  const priceBookVariantsSection = [
    'priceBookVariants',
    'priceBookVariantsHistory',
    'priceBookVariantBulkDelete',
    'priceBookVariantCreate',
    'priceBookVariantDelete',
    'priceBookVariantUpdate',
  ];
  const priceBookUsersSection = [
    'priceBookUsers',
    'userAddToPriceBook',
    'userRemoveFromPriceBook',
  ];
  const priceBookBusinessEntitiesSection = [
    'priceBookEntities',
    'businessEntityAddToPriceBook',
    'businessEntityRemoveFromPriceBook'
  ];
  const salesSection = [
    'sale',
    'sales',
    'saleBulkDelete',
    'saleCataloguesAdd',
    'saleCataloguesRemove',
    'saleCreate',
    'saleDelete',
    'saleUpdate'
  ];
  const vouchersSection = [
    'voucher',
    'vouchers',
    'voucherBulkDelete',
    'voucherCataloguesAdd',
    'voucherCataloguesRemove',
    'voucherCreate',
    'voucherDelete',
    'voucherUpdate'
  ];
  const addressSection = [
    'address',
    'addressValidationRules',
    'addressCreate',
    'addressDelete',
    'addressSetDefault',
    'addressUpdate'
  ];
  const permissionGroupsSection = [
    'permissionGroup',
    'permissionGroups',
    'permissionGroupCreate',
    'permissionGroupDelete',
    'permissionGroupUpdate'
  ];
  const usersSection = [
    'me',
    'user',
    'userByEmail',
    'userSellers',
    'accountAddressCreate',
    'accountAddressDelete',
    'accountAddressSetDefault',
    'accountAddressUpdate',
    'accountConfirm',
    'accountDelete',
    'accountRegister',
    'accountRequestDeletion',
    'accountUpdate',
    'enhancedAccountRegister',
    'userAvatarDelete',
    'userAvatarUpdate',
    'userBulkSetActive',
  ];
  const staffSection = [
    'staffUsers',
    'staffBulkDelete',
    'staffCreate',
    'staffDelete',
    'staffNotificationRecipientCreate',
    'staffNotificationRecipientUpdate',
    'staffNotificationRecipientDelete',
    'staffUpdate',
  ];
  const emailSection = [
    'emailChangeConfirm',
    'emailChangeRequest',
  ];
  const passwordSection = [
    'passwordChange',
    'passwordRequestReset',
    'passwordSet'
  ];
  const appsSection = [
    'app',
    'apps',
    'appsInstallations',
    'appActivate',
    'appCreate',
    'appDeactivate',
    'appDeleteFailedInstallation',
    'appDelete',
    'appFetchManifest',
    'appInstall',
    'appRetryInstall',
    'appUpdate',
  ];
  const typeformSection = [
    'typeformForm',
    'typeformForms'
  ];
  const metadataSection = [
    'metadataDelete',
    'metadataUpdate',
    'privateMetadataUpdate',
    'privateMetadataDelete'
  ];
  const pluginsSection = [
    'plugin',
    'pluginFlows',
    'plugins',
    'pluginSyncSettings',
    'pluginFlowDelete',
    'pluginFlowUpdate',
    'pluginSyncUpdate',
    'pluginUpdate'
  ];
  const webhooksSection = [
    'webhook',
    'webhookEvents',
    'webhookEventLogs',
    'webhookJobs',
    'webhookSamplePayload',
    'webhookCreate',
    'webhookUpdate',
    'webhookDelete',
    'periodicTask',
    'updatePeriodicTaskEnabled'
  ];
  const businessEntitiesSection = [
    'businessEntity',
    'businessEntities',
    'businessEntityCreate',
    'businessEntityUpdate',
    'businessEntityDelete'
  ];
  const configurationSection = [
    'marketplaceConfiguration',
    'nauticalConfiguration',
    'nauticalConfigurationList',
    'shop',
    'dashboardConfigurationUpdate',
    'marketplaceConfigurationUpdate',
    'nauticalConfigurationUpdate',
    'shopAddressUpdate',
    'shopDomainUpdate',
    'shopSettingsUpdate'
  ];
  const documentsSection = [
    'documentAdd',
    'documentAttach',
    'documentUpdate',
    'documentRemove'
  ];
  const insightsPayoutsSection = [
    'insightsMarketplaceAffiliatePayoutsSummary',
    'insightsMarketplacePayoutsSummary',
  ];
  const insightsOrdersSection = [
    'insightsOrdersMarketplaceSummary',
    'insightsOrdersCustomerSummary',
    'insightsOrdersSellerSummary',
  ];
    const insightsSalesSection = [
    'insightsMarketplacePaymentsSummary',
    'insightsTopPerformingProducts',
    'insightsTopPerformingCategories',
    'reportProductSales',
  ];
    const insightsTaxSection = [
    'insightsMarketplaceTaxSummary',
    'insightsMarketplaceTaxesByCountry',
    'insightsMarketplaceTaxesByCountryArea'
  ];
  const logsSection = [
    'emailLogs'
  ];
  const channelsSection = [
    'channels',
    'channelCreate',
    'channelUpdate'
  ];
  const conversationsSection = [
    'conversation',
    'conversationCreate',
    'conversationMessageAdd',
    'conversationParticipantAdd',
    'conversationParticipantRemove',
    'conversationUpdate'
  ];
  const menusSection = [
    'menu',
    'menus',
    'assignNavigation',
    'menuBulkDelete',
    'menuCreate',
    'menuDelete',
    'menuUpdate',
    'menuItem',
    'menuItems',
    'menuItemBulkDelete',
    'menuItemCreate',
    'menuItemDelete',
    'menuItemMove',
    'menuItemUpdate'
  ];
  const mentionsSection = [
    'mention',
    'mentionCount',
    'mentionNode',
    'mentionsByReceiver',
    'mentionsBySender',
    'mentionCreate'
  ];
  const micrositesSection = [
    'microsite',
    'microsites',
    'vendorMicrosite',
    'micrositeAddProducts',
    'micrositeBulkDelete',
    'micrositeBulkPublish',
    'micrositeCreate',
    'micrositeDelete',
    'micrositeRemoveProducts',
    'micrositeReorderProducts',
    'micrositeUpdate'
  ];
  const pagesSection = [
    'page',
    'pages',
    'pageBulkDelete',
    'pageBulkPublish',
    'pageCreate',
    'pageDelete',
    'pageUpdate'
  ];
  const sitesSection = [
    'sites',
    'siteBulkDelete',
    'siteCreate',
    'siteUpdate'
  ];
  const translationsSection = [
    'translation',
    'translations',
    'agreementTranslate',
    'attributeTranslate',
    'attributeValueTranslate',
    'categoryTranslate',
    'collectionTranslate',
    'menuItemTranslate',
    'micrositeTranslate',
    'pageTranslate',
    'productTranslate',
    'productVariantTranslate',
    'saleTranslate',
    'shippingPriceTranslate',
    'shopSettingsTranslate',
    'voucherTranslate'
  ];  
     
  
  function getFilteredAndSortedItems(sectionArray) {
    return queryType.fields
      .filter((query) => sectionArray.includes(query.name))
      .map((query) => ({
        ...query,
        isQuery: true,
      }))
      .sort(sortByName)
      .concat(
        mutationType.fields
          .filter((mutation) => sectionArray.includes(mutation.name))
          .map((mutation) => ({
            ...mutation,
            isMutation: true,
          }))
          .sort(sortByName)
      );
  }  

  // This is a contrived example that shows how you can generate your own simple or nested set
  // of data and items to create the output you want for SpectaQL. This example will only
  // output the Queries in a sub-heading called "Queries" under an outer heading called "Operations",
  // and then all the "normal" Types in the schema under a heading called "Types".
  //
  // What should be noted is that you can nest things (more than once) for ultimate
  // control over what data you display, and in what arrangement. Yay!
  return [
    {
      name: 'Access',
      hideInNav: false,
      makeNavSection: false,
      hideInContent: true,
      makeContentSection: false,
      items: [
        {
          name: 'App token',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(appTokenSection)

        },
        {
          name: 'User token',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(userTokenSection)
        }
    ]
    },
      {
        name: 'Catalog Management',
        hideInNav: false,
        makeNavSection: false,
        hideInContent: true,
        makeContentSection: false,
        items: [
        {
          name: 'Attributes',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(attributesSection)
          .concat(getFilteredAndSortedItems(attributeValuesSection))
        },
        {
          name: 'Categories',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(categoriesSection)
        },
        {
          name: 'Collections',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(collectionsSection)
        },    
        {
          name: 'Digital content',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(digitalContentSection)
        },    
        {
          name: 'Features',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(featuresSection)
        },  
        {
          name: 'Grouped products',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(groupedProductsSection)
        },  
        {
          name: 'Import and export',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(importAndExportSection)
        },  
        {
          name: 'Products',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(productsSection)
        },   
        {
          name: 'Product types',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(productTypesSection)
        }, 
        {
          name: 'Variants',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(variantsSection)
        },                     
      ],
    },
    {
      name: 'Order Management',
      hideInNav: false,
      makeNavSection: false,
      hideInContent: true,
      makeContentSection: false,
      items: [
        {
          name: 'Checkout',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(checkoutSection)
        },
        {
          name: 'Credit Limits',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(creditLimitsSection)
        },
        {
          name: 'Customers',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(customersSection)
        },
        {
          name: 'Currency',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(currencySection)
        },
        {
          name: 'Fulfillment',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(fulfillmentSection)
        },
        {
          name: 'Invoices',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(invoicesSection)
        },
        {
          name: 'Orders',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(ordersSection)
        },
        {
          name: 'Payments',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(paymentsSection)
        },
        {
          name: 'Refunds',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(refundsSection)
        },
        {
          name: 'Returns',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(returnsSection)
        },
        {
          name: 'Taxes',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(taxesSection)
        },
        {
          name: 'Wishlist',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(wishlistSection)
        },
      ]},
      {
        name: 'Vendor Management',
        hideInNav: false,
        makeNavSection: false,
        hideInContent: true,
        makeContentSection: false,
        items: [
          {
            name: 'Affiliates',
            makeNavSection: true,
            makeContentSection: true,
            items: getFilteredAndSortedItems(affiliatesSection)
          },
          {
            name: 'Agreements',
            makeNavSection: true,
            makeContentSection: true,
            items: getFilteredAndSortedItems(agreementsSection)
          },
          {
            name: 'Payouts',
            makeNavSection: true,
            makeContentSection: true,
            items: getFilteredAndSortedItems(payoutsSection)
          },
          {
            name: 'Sellers',
            makeNavSection: true,
            makeContentSection: true,
            items: getFilteredAndSortedItems(sellersSection)
          },
        ]
    },
    {
      name: 'Inventory Management',
      hideInNav: false,
      makeNavSection: false,
      hideInContent: true,
      makeContentSection: false,
      items: [
        {
          name: 'Shipping zones',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(shippingZonesSection)
        },
        {
          name: 'Stocks',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(stocksSection)
        },
        {
          name: 'Warehouses',
          makeNavSection: true,
          makeContentSection: true,
          items: getFilteredAndSortedItems(warehousesSection)
        },
      ]},
      {
        name: 'Discounts',
        hideInNav: false,
        makeNavSection: false,
        hideInContent: true,
        makeContentSection: false,
        items: [
          {
            name: 'Price books',
            makeNavSection: true,
            makeContentSection: true,
            items: getFilteredAndSortedItems(priceBooksSection)
              .concat(
                getFilteredAndSortedItems(priceBookProductTypesSection),
                getFilteredAndSortedItems(priceBookProductsSection),
                getFilteredAndSortedItems(priceBookVariantsSection),
                getFilteredAndSortedItems(priceBookUsersSection),
                getFilteredAndSortedItems(priceBookBusinessEntitiesSection)
              )
          },
          {
            name: 'Sales',
            makeNavSection: true,
            makeContentSection: true,
            items: getFilteredAndSortedItems(salesSection)
          },
          {
            name: 'Vouchers',
            makeNavSection: true,
            makeContentSection: true,
            items: getFilteredAndSortedItems(vouchersSection)
          },
        ]},
        {
          name: 'User management',
          hideInNav: false,
          makeNavSection: false,
          hideInContent: true,
          makeContentSection: false,
          items: [
            {
              name: 'Address',
              makeNavSection: true,
              makeContentSection: true,
              items: getFilteredAndSortedItems(addressSection)
            },
            {
              name: 'Permission Groups',
              makeNavSection: true,
              makeContentSection: true,
              items: getFilteredAndSortedItems(permissionGroupsSection)
            },
            {
              name: 'Users',
              makeNavSection: true,
              makeContentSection: true,
              items: getFilteredAndSortedItems(usersSection)
                .concat(
                  getFilteredAndSortedItems(staffSection),
                  getFilteredAndSortedItems(emailSection),
                  getFilteredAndSortedItems(passwordSection)
                )
            },
          ]},
          {
            name: 'Extensibility',
            hideInNav: false,
            makeNavSection: false,
            hideInContent: true,
            makeContentSection: false,
            items: [
              {
                name: 'Apps',
                makeNavSection: true,
                makeContentSection: true,
                items: getFilteredAndSortedItems(appsSection)
                .concat(getFilteredAndSortedItems(typeformSection))
              },
              {
                name: 'Metadata',
                makeNavSection: true,
                makeContentSection: true,
                items: getFilteredAndSortedItems(metadataSection)
              },
              {
                name: 'Plugins',
                makeNavSection: true,
                makeContentSection: true,
                items: getFilteredAndSortedItems(pluginsSection)
              },
              {
                name: 'Webhooks',
                makeNavSection: true,
                makeContentSection: true,
                items: getFilteredAndSortedItems(webhooksSection)
              }
            ]},
            {
              name: 'General',
              hideInNav: false,
              makeNavSection: false,
              hideInContent: true,
              makeContentSection: false,
              items: [
                {
                  name: 'Business Entities',
                  makeNavSection: true,
                  makeContentSection: true,
                  items: getFilteredAndSortedItems(businessEntitiesSection)
                },
                {
                  name: 'Configuration',
                  makeNavSection: true,
                  makeContentSection: true,
                  items: getFilteredAndSortedItems(configurationSection)
                },
                {
                  name: 'Documents',
                  makeNavSection: true,
                  makeContentSection: true,
                  items: getFilteredAndSortedItems(documentsSection)
                },
                {
                  name: 'Insights',
                  makeNavSection: true,
                  makeContentSection: true,
                  items: getFilteredAndSortedItems(insightsPayoutsSection)
                  .concat(
                    getFilteredAndSortedItems(insightsOrdersSection),
                    getFilteredAndSortedItems(insightsSalesSection),
                    getFilteredAndSortedItems(insightsTaxSection)
                  )
                },
                {
                  name: 'Logs',
                  makeNavSection: true,
                  makeContentSection: true,
                  items: getFilteredAndSortedItems(logsSection)
                },
              ]},
              {
                name: 'Front-End',
                hideInNav: false,
                makeNavSection: false,
                hideInContent: true,
                makeContentSection: false,
                items: [
                  {
                    name: 'Channels',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(channelsSection)
                  },
                  {
                    name: 'Conversations',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(conversationsSection)
                  },
                  {
                    name: 'Menus',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(menusSection)
                  },
                  {
                    name: 'Mentions',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(mentionsSection)
                  },
                  {
                    name: 'Microsites',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(micrositesSection)
                  },
                  {
                    name: 'Pages',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(pagesSection)
                  },
                  {
                    name: 'Sites',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(sitesSection)
                  },
                  {
                    name: 'Translations',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: getFilteredAndSortedItems(translationsSection)
                  },
                ]},
    {
      name: 'Types',
      makeContentSection: true,
      items: normalTypes
        .map((type) => ({
          ...type,
          isType: true,
        }))
        .sort(sortByName),
    },
  ].filter(Boolean)
}