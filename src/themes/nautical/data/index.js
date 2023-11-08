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
    includeSubscription: false
  })

  function getFilteredAndSortedItems(sectionArray) {
    // Retrieve items from queries, mutations, and types
    const queryItems = getQueryTypeItems(sectionArray);
    const mutationItems = getMutationTypeItems(sectionArray);
    const normalTypeItems = getNormalTypeItems(sectionArray)
    .map(type => ({
      ...type,
      isType: true, // add the isType property
    }));
  
    // Combine all items into one array and sort them
    const combinedItems = queryItems
      .concat(mutationItems)
      .concat(normalTypeItems)
  
    // Return the sorted combined items
    return combinedItems;
  }

  function getQueryTypeItems(sectionArray) {
    return queryType.fields
      .filter((query) => sectionArray.includes(query.name))
      .map((query) => ({
        ...query,
        isQuery: true,
      }))
      .sort(sortByName);
  }
  
  function getMutationTypeItems(sectionArray) {
    return mutationType.fields
      .filter((mutation) => sectionArray.includes(mutation.name))
      .map((mutation) => ({
        ...mutation,
        isMutation: true,
      }))
      .sort(sortByName);
  }

  function getNormalTypeItems(sectionArray) {
    const suffixes = [
      'countableconnection',
      'countableedge',
      'type',
      'input',
      'inputtypeenum',
      'filterinput',
      'filterconnector',
      'status',
      'statusenum',
      'error',
      'errorcode',
      'sortinginput',
      'sortinput',
      'sortfield',
      'enum',
      'typeenum'
    ];
  
    return normalTypes
      .filter((type) => {
        const baseNameLowerCase = type.name.toLowerCase();
        return sectionArray.some((sectionItem) => {
          const sectionItemLowerCase = sectionItem.toLowerCase();
          // Check for direct match or match with any additional suffixes
          // Use the lowercase variables for comparison only
          return baseNameLowerCase === sectionItemLowerCase || 
                 suffixes.some(suffix => baseNameLowerCase === `${sectionItemLowerCase}${suffix}`);
        });
      })
      // Ensure that we're sorting based on the original case
      .sort((a, b) => a.name.localeCompare(b.name));
  }  

  
  //define arrays for each section
  const appTokenSection = [
    'appTokenCreate',
    'appTokenDelete',
    'appTokenVerify',
    'appToken',
  ];
  const userTokenSection = [
    'tokenCreate',
    'tokensDeactivateAll',
    'tokenRefresh',
    'tokenVerify',
    'CreateToken',
    'RefreshToken',
    'DeactivateAllUserTokens',
    'VerifyToken'
  ];
  const attributesSection = [
    'attribute',
    'attributes',
    'attributeAssign',
    'attributeBulkDelete',
    'attributeCreate',
    'attributeDelete',
    'attributeUnassign',
    'attributeUpdate',
    'attributeValue',
    'attributeType',
    'attributeValueBulkCreate',
    'attributeValueBulkDelete',
    'attributeValueCreate',
    'attributeValueDelete',
    'attributeValueUpdate',
    'attributeValuesReorder',
    'AttributeReorderValues',
    'SelectedAttribute',
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
    'collectionPublished',
    'homepageCollectionUpdate'
  ];
  
  const digitalContentSection = [
    'digitalContent',
    'digitalContents',
    'digitalContentCreate',
    'digitalContentDelete',
    'digitalContentUpdate',
    'digitalContentUrlCreate',
    'DigitalContentUrl',
    'DigitalContentUploadInput'
  ];
  
  const featuresSection = [
    'featureCreate',
    'featureUpdate',
    'featureDelete',
    'productTypeFeatureCreate',
    'productTypeFeatureDelete',
    'productTypeFeatureUpdate',
    'feature',
    'FeatureFilterConnector',
    'FeatureFilterOperation',
    'FeatureFilterOperationCondition',
    'featuretype',
    'VariantFeature',
    'VariantFeatureCountableConnection',
    'VariantFeatureCountable',
    'ProductTypeFeatureInput',
    'ProductTypeProductFeature',
    'ProductTypeVariantFeature',
    'ProductFeature',
    'ProductFeatureCountableConnection',
    'ProductFeatureCountableEdge',
  ];
  
  const groupedProductsSection = [
    'groupedProductAddProducts',
    'groupedProductRemoveProducts'
  ];
  
  const importSection = [
    'availableImportSources',
    'catalogImportProcess',
    'catalogImportProcesses',
    'catalogImport',
    'CatalogImportOperation',
    'CatalogImportProcessLogRecord',
    'CatalogImportProcessLogRecordOperation',
    'CatalogImportProcessStatus',
    'ImportCatalog',
    'ImportError',
    'ImportEvent',
    'ImportEventsEnum',
    'ImportFile',
  ];

  const exportSection = [
    'exportFile',
    'exportFiles',
    'ExportCatalog',
    'catalogExport',
    'ExportError',
    'ExportErrorCode',
    'ExportEvent',
    'ExportEventsEnum',
    'ExportInfoInput',
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
    'BulkProductError',
    'ProductFieldEnum',
    'ProductImage',
    'ProductImageCountableConnection',
    'ProductImageCountableEdge',
    'ProductOrder',
    'ProductOrderField',
    'ProductPricingInfo',
    'ProductSearchFieldEnum',
    'ProductSearchInput',
    'ProductStockFilterInput',
    'ProductSubStatus',
    'ProductSubStatusEnum',
    'ProductAction',
    'ExportProducts',
    'ExportProductsInput',
    'ExportScope',
  ];

  const locationsSection = [
    'locationGeocode',
    'locationSearch',
    'Location',
    'LocationInput',
    'LocationKindEnum',
    'LocationTypeEnum',
    'productLocationCreate',
    'productLocationDelete',
    'productLocationUpdate',
    'productSetLocationType',
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
    'productVariantImageUnassign',
    'VariantImageAssign',
    'VariantImageUnassign',
    'VariantPricingInfo',
    'VariantSize',
    'VariantSizeInput',
    'VariantSortField',
    'VariantSortingInput',
    'VariantUniquenessEnum',
    'ProductVariantReorder',
    'ProductVariantReportType',
    'ProductVariantSearchFieldEnum',
    'ProductVariantSearchInput',
    'ProductVariantSubStatus',
    'ProductVariantSubStatusEnum',
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
    'CheckoutShippingMethodUpdate',
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
    'checkoutRemovePromoCode',
    'MultiSellerShippingMethod',
  ];
  const creditLimitsSection = [
    'creditLimit',
    'creditLimits',
    'userCreditLimitUpdate',
    'CreditLimitUpdate',
  ];
  const customersSection = [
    'customer',
    'customerEvent',
    'customerEvents',
    'customers',
    'customerBulkDelete',
    'customerCreate',
    'customerDelete',
    'customerUpdate',
    'customersExport',
    'customerFilterInput',
    'CustomerOrderStatusFilter',
    'CustomerOrder',
    'ExportCustomers',
  ];
  const currencySection = [
    'currencies',
    'exchangeRatesRefresh',
    'NauticalCurrency',
  ];
  const fulfillmentSection = [
    'orderDeclineFulfillment',
    'orderFulfill',
    'orderFulfillmentCancel',
    'orderFulfillmentCreateLabel',
    'orderFulfillmentUpdateTracking',
    'orderMarkAsDelivered',
    'Fulfillment',
    'FulfillmentCancel',
    'FulfillmentCreateLabel',
    'FulfillmentLine',
    'TrackingNumbers',
    'FulfillmentStatusFilter',
    'DeclineFulfillInput',
    'DeclineFulfillLineInput',
    'DeclineFulfillStockInput',
  ];
  const invoicesSection = [
    'invoiceCreate',
    'invoiceDelete',
    'invoiceRequest',
    'invoiceRequestDelete',
    'invoiceSendNotification',
    'invoiceUpdate',
    'UpdateInvoiceInput',
    'Invoice',
    'InvoiceError',
    'InvoiceErrorCode'
  ];
  const offersSection = [
    'bidAccept',
    'bidCreate',
    'bidReject',
    'OfferOrderSubStatusFilter',
    'AcceptBid',
    'Bid',
    'BidError',
    'BidErrorCode',
    'BidInput',
    'BidRole',
    'BidRoleEnum',
    'BidStatus',
    'RejectBid',
    'orderOfferConvertToNauticalQuoteOrder',
  ];
  const quotesSection = [
    'quoteOrders',
    'nauticalQuoteOrders',
    'SendQuoteToCustomer',
    'QuoteOrderSubStatusFilter',
    'OrderQuoteFilterInput',
    'nauticalQuoteOrderByToken',
    'nauticalQuoteOrderCancel',
    'NauticalOrderQuoteFilterInput',
    'nauticalQuoteOrderSendToCustomer',
  ];
  const draftsSection = [
    'draftOrders',
    'nauticalDraftOrders',
    'DraftOrderInitialStatus',
    'DraftOrderInput',
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
    'NauticalOrderDraftFilterInput',
    'OrderDraftFilterInput',
  ];
  const nauticalOrdersSection = [
    'nauticalOrders',
    'nauticalOrder',
    'nauticalOrdersTotal',
    'nauticalOrderByToken',
    'nauticalSuborders',
    'nauticalOrderAddNote',
    'nauticalOrderUpdateApplyVoucherCode',
    'nauticalOrderUpdateDeleteDiscount',
    'nauticalOrderCancel',
    'nauticalOrderCapture',
    'nauticalOrderChannelUpdate',
    'nauticalOrderLineBulkCancel',
    'nauticalOrderMarkAsPaid',
    'nauticalOrderPaymentCreate',
    'nauticalOrderReplaceOrderLine',
    'nauticalOrderUpdateShipping',
    'nauticalOrderUpdate',
    'nauticalOrderVoid',
    'ordersMapToNauticalOrder',
    'MapOrdersToNauticalOrder',
    'NauticalOrderEvent',
    'NauticalOrderEventCountableConnection',
    'NauticalOrderEventCountableEdge',
    'NauticalOrderEventOrderLineObject',
    'NauticalOrderLine',
    'NauticalOrderOrderSource',
    'NauticalOrderSubStatus',
    'NauticalSecondaryOrderLine',
    'NauticalSubOrder',
  ];
  const ordersSection = [
    'order',
    'orderByToken',
    'orders',
    'ordersTotal',
    'orderAddNote',
    'orderBulkCancel',
    'orderCancel',
    'orderCapture',
    'orderChannelUpdate',
    'orderFeeCreate',
    'orderFeeDelete',
    'orderMarkAsPaid',
    'orderPayoutStatusUpdate',
    'orderUpdateShipping',
    'orderUpdate',
    'orderVoid',
    'OrderAction',
    'OrderAffiliateSummaryType',
    'OrderDirection',
    'OrderEvent',
    'OrderEventCountableConnection',
    'OrderEventCountableEdge',
    'OrderEventOrderLineObject',
    'OrderEventsEmailsEnum',
    'OrderEventsEnum',
    'OrderFee',
    'OrderFeeInput',
    'OrderFulfillLineInput',
    'OrderFulfillStockInput',
    'OrderLine',
    'OrderLineCreateInput',
    'OrderLineInput',
    'OrderLinePriceOverrideInput',
    'OrderOrderSource',
    'OrderPayoutStatusEnum',
    'OrderSellerSummaryType',
    'OrderSourceFilter',
    'OrderStatusFilter',
    'OrderSubStatus',
    'OrderSubStatusEnum',
    'OrderSummaryDeltaDataType',
    'OrderVendorSummaryType',
    'FeeScope',
    'SecondaryOrderLine',
  ];
  const paymentsSection = [
    'payment',
    'payments',
    'getClientSecret',
    'paymentCapture',
    'paymentRefund',
    'paymentVoid',
    'CreditCard',
    'Transaction',
    'TransactionError',
    'TransactionKind',
    'StripeClientPaymentData',
    'PaymentChargeStatusEnum',
    'PaymentGateway',
    'PaymentSource',
  ];
  
  const refundsSection = [
    'refund',
    'refunds',
    'nauticalOrderRefund',
    'orderRefund',
    'refundsChangeStatus',
    'refundCreate',
    'refundsDelete',
    'refundUpdate',
    'refundLinesAdd',
    'refundLinesDelete',
    'refundLinesUpdate',
    'refundPaymentsAdd',
    'refundPaymentsDelete',
    'refundPaymentsUpdate',
    'RefundBulkDelete',
    'RefundChargeToEnum',
    'RefundLine',
    'RefundLineBulkDelete',
    'RefundLineCountableConnection',
    'RefundLineCountableEdge',
    'RefundLineInput',
    'RefundLineScopeEnum',
    'RefundLineTypeEnum',
    'RefundLineUpdateInput',
    'RefundMethod',
    'RefundPayment',
    'RefundPaymentCountableConnection',
    'RefundPaymentCountableEdge',
    'RefundPaymentInput',
    'RefundPaymentTypeEnum',
    'RefundPaymentUpdateInput',
    'RefundScope',
    'orderRefund'
  ];
  
  const returnsSection = [
    'returns',
    'fulfillmentBulkReturn',
    'BulkFulfillmentReturn',
    'BulkFulfillmentReturnInput',
    'nauticalOrderReturnFromStorefrontNotification',
    'nauticalOrderReturnNotification',
    'orderFulfillmentReturn',
    'orderReturnNotification',
    'vendorOrderReturnFromStorefrontNotification',
    'FulfillmentReturn',
    'FulfillmentReturnStatusBulkUpdate',
    'FulfillmentUpdateReturnStatus',
    'FulfillmentUpdateTracking',
    'ReturnFulfillmentFilterInput',
    'ReturnFulfillmentSortField',
    'ReturnFulfillmentSortingIn',
    'NauticalFulfillment',
    'NauticalFulfillmentLine',
    'NauticalFulfillmentStatus',
    'ReturnFulfillmentSortingInput',
  ];
  
  const taxesSection = [
    'avalaraRequestLogs',
    'customerTaxCertificates',
    'taxExemptCodes',
    'taxTypes',
    'nauticalOrderRefreshTaxes',
    'TaxCertificate',
    'TaxExemptCode',
    'TaxRateType',
    'TaxType',
    'TaxedMoney',
    'TaxedMoneyRange',
    'ShopFetchTaxRates',
    'VAT',
    'AvalaraRequestLog',
    'AvalaraRequestLogCountableConnection',
    'AvalaraRequestLogCountableEdge',
  ];
  
  const wishlistSection = [
    'wishlist',
    'WishlistAddProductMutation',
    'WishlistAddProductVariantMutation',
    'WishlistBuyerInput',
    'WishlistCountableConnection',
    'WishlistCountableEdge',
    'WishlistError',
    'WishlistItem',
    'WishlistItemSortingInput',
    'WishlistErrorCode',
    'wishlistItemsByName',
    'WishlistRemoveProductMutation',
    'WishlistRemoveProductVariantMutation',
    'wishlistAddProduct',
    'wishlistAddVariant',
    'wishlistCreateForBuyer',
    'wishlistCreate',
    'wishlistDelete',
    'wishlistItemUpdate',
    'wishlistRemoveProduct',
    'wishlistRemoveVariant',
    'wishlistSetDefault',
    'wishlistUpdate',
    'WishlistItemInputFilter',
    'SetDefaultWishlist',
  ];  
  const affiliatesSection = [
    'affiliate',
    'affiliates',
    'affiliateCreate',
    'affiliateUpdate',
    'affiliateDelete',
    'affiliateAvatarUpdate',
    'affiliateBulkDelete',
    'affiliateCode',
    'affiliateCodes',
    'affiliateCodeCreate',
    'affiliateCodeSetActive',
    'affiliateCodeBulkSetActive',
    'affiliateCodeUse',
    'affiliateCodeChannelUpdate',
    'AffiliateCodeFilterInput',
    'AffiliateCodeSortField',
    'AffiliateCodeSortingInput',
    'OptimizedAffiliate',
    'OptimizedAffiliateChannel'
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
    'agreementUpdate',
    'AgreementAgreementType',
    'AgreementCommission',
    'AgreementCommissionType',
    'AgreementFee',
    'AgreementFees',
    'AgreementGranularCommission',
    'AgreementMarkupCommission',
    'AgreementOrder',
    'AgreementSellers',
    'AgreementVendorType',
    'commission',
    'DeeScope',
    'FeeType',
    'MarkupCommissionTypeEnum',
    'CommissionTypeEnum',
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
    'GetPayoutOnboardingLink',
    'vendorPayout',
    'vendorPayoutList',
    'vendorPayouts',
    'vendorPayoutNoteAdd',
    'vendorPayoutNoteUpdate',
    'vendorPayoutOnboardingLinkRequest',
    'vendorPayoutStatusUpdate',
    'vendorPayoutsBulkExclude',
    'vendorPayoutsBulkInclude',
    'vendorPayoutsBulkProcess',
    'VendorPayoutAddNoteInput',
    'VendorPayoutDetails',
    'VendorPayoutEvent',
    'VendorPayoutEventsEnum',
    'VendorPayoutReport',
    'VendorPayoutReportSubset',
    'VendorPayoutStatusInput',
    'VendorPayoutUpdateInput',
    'VendorPayoutUpdateNoteInput',
    'VendorTypeEnum',
    'PayoutDatesInput',
    'PayoutStatusFilter',
    'PayoutStatusInput',
    'PayoutVendorType',
    'UserExternalPayoutSource',
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
    'AcknowledgeSellerAgreement',
    'sellerDataCreate',
    'sellerDataUpdate',
    'sellerLogoUpdate',
    'sellerNoteCreate',
    'sellerOnboardingChecklistComplete',
    'DefaultSellerChecklist',
    'DefaultSellerChecklistInput',
    'sellerOwnerDelete',
    'sellerSettingsUpdate',
    'sellerShellCreate',
    'sellerUserMappingCreate',
    'sellerWithOwnerCreate',
    'Vendor',
    'UpdateSellerData',
    'UpdateSellerSettings',
    'CreateSellerData',
    'CreateSellerNote',
    'CreateSellerShell',
    'CreateSellerUserMapping',
    'SellerCards',
    'SellerChecklistCompetitionTriggersEnum',
    'SellerChecklistInput',
    'SellerEventType',
    'SellerEventTypeCountableConnection',
    'SellerEventTypeCountableEdge',
    'SellerExternalPayoutSource',
    'SellerNoteInput',
    'SellerOnboardingChecklist',
    'SellerOnboardingChecklistError',
    'SellerOnboardingChecklistErrorCode',
    'SellerOwnerCreateInput',
    'SellerShippingMethodInput',
    'SellerStatusFilter',
    'SellerUpdateInput',
    'SellerUserTypeCountableConnection',
    'SellerUserTypeCountableEdge',
    'DetailedSellerInput',
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
    'shippingPriceUpdate',
    'ShippingMethod',
    'ShippingMethodTypeEnum',
    'ShippingPriceInput',
    'ShippingError',
    'ShippingErrorCode',

  ];
  const stocksSection = [
    'stock',
    'stocks',
    'productVariantStocksCreate',
    'productVariantStocksDelete',
    'productVariantStocksUpdate',
    'BulkStockError',
    'StockEvent',
    'Allocation',
    'StockEventType',
    'StockAvailability'
  ];
  const warehousesSection = [
    'warehouse',
    'warehouses',
    'warehouseCreate',
    'warehouseDelete',
    'warehouseUpdate',
    'WarehouseAddressInput',
    'WarehouseStats',

  ];
  const priceBooksSection = [
    'priceBook',
    'priceBooks',
    'priceBookBulkDelete',
    'priceBookCreate',
    'priceBookDelete',
    'priceBookUpdate',
    'priceBookProductTypes',
    'priceBookProductTypesHistory',
    'priceBookProductTypeBulkDelete',
    'priceBookProductTypeCreate',
    'priceBookProductTypeDelete',
    'priceBookProductTypeUpdate',
    'priceBookProducts',
    'priceBookProductsHistory',
    'priceBookProductUpdate',
    'priceBookProductBulkDelete',
    'priceBookProductCreate',
    'priceBookProductDelete',
    'priceBookVariants',
    'priceBookVariantsHistory',
    'priceBookVariantBulkDelete',
    'priceBookVariantCreate',
    'priceBookVariantDelete',
    'priceBookVariantUpdate',
    'priceBookUsers',
    'userAddToPriceBook',
    'userRemoveFromPriceBook',
    'priceBookEntities',
    'businessEntityAddToPriceBook',
    'businessEntityRemoveFromPriceBook',
    'PriceBookProduct',
    'PriceBookProductCountableConnection',
    'PriceBookProductCountableEdge',
    'PriceBookProductFilterInput',
    'PriceBookProductHistory',
    'PriceBookProductHistoryCountableConnection',
    'PriceBookProductHistoryCountableEdge',
    'PriceBookProductHistoryFilterInput',
    'PriceBookProductHistorySortField',
    'PriceBookProductHistorySortingInput',
    'PriceBookProductHistoryValueType',
    'PriceBookProductSortField',
    'PriceBookProductSortingInput',
    'PriceBookProductType',
    'PriceBookProductTypeCountableConnection',
    'PriceBookProductTypeCountableEdge',
    'PriceBookProductTypeFilterInput',
    'PriceBookProductTypeHistory',
    'PriceBookProductTypeHistoryCountableConnection',
    'PriceBookProductTypeHistoryCountableEdge',
    'PriceBookProductTypeHistoryFilterInput',
    'PriceBookProductTypeHistorySortField',
    'PriceBookProductTypeHistorySortingInput',
    'PriceBookProductTypeHistoryValueType',
    'PriceBookProductTypeSortField',
    'PriceBookProductTypeSortingInput',
    'PriceBookProductTypeValueType',
    'PriceBookProductValueType',
    'PriceBookValueTypeEnum',
    'PriceBookVariant',
    'PriceBookVariantCountableConnection',
    'PriceBookVariantCountableEdge',
    'PriceBookVariantFilterInput',
    'PriceBookVariantHistory',
    'PriceBookVariantHistoryCountableConnection',
    'PriceBookVariantHistoryCountableEdge',
    'PriceBookVariantHistoryFilterInput',
    'PriceBookVariantHistorySortField',
    'PriceBookVariantHistorySortingInput',
    'PriceBookVariantHistoryValueType',
    'PriceBookVariantSortField',
    'PriceBookVariantSortingInput',
    'PriceBookVariantValueType',
  ];
  const salesSection = [
    'sale',
    'sales',
    'saleBulkDelete',
    'saleCataloguesAdd',
    'saleCataloguesRemove',
    'saleCreate',
    'saleDelete',
    'saleUpdate',
    'Sale',
    'SaleAddCatalogues',
    'SaleBulkDelete',
    'SaleCountableConnection',
    'SaleCountableEdge',
    'SaleCreate',
    'SaleDelete',
    'SaleFilterInput',
    'SaleInput',
    'SaleRemoveCatalogues',
    'SaleSortField',
    'SaleSortingInput',
    'SaleTranslatableContent',
    'SaleTranslation',
    'SaleType',
    'SaleUpdate',
  ];
  const vouchersSection = [
    'voucher',
    'vouchers',
    'voucherBulkDelete',
    'voucherCataloguesAdd',
    'voucherCataloguesRemove',
    'voucherCreate',
    'voucherDelete',
    'voucherUpdate',
    'voucherType',
    'Voucher',
    'VoucherAddCatalogues',
    'VoucherBulkDelete',
    'VoucherCountableConnection',
    'VoucherCountableEdge',
    'VoucherCreate',
    'VoucherDelete',
    'VoucherDiscountType',
    'VoucherFilterInput',
    'VoucherInput',
    'VoucherRemoveCatalogues',
    'VoucherSortField',
    'VoucherSortingInput',
    'VoucherTypeEnum',
    'VoucherUpdate',
    'discount',
    'discounterror',
    'discounterrorcode',
    'discountstatus',
    'DiscountValueTypeEnum',
  ];
  const addressSection = [
    'address',
    'addressValidationRules',
    'addressCreate',
    'addressDelete',
    'addressSetDefault',
    'addressUpdate',
    'AddressTypeEnum',
    'AddressValidationData',
    'accountAddressCreate',
    'accountAddressDelete',
    'accountAddressSetDefault',
    'accountAddressUpdate',
  ];
  const permissionGroupsSection = [
    'permissionGroup',
    'permissionGroups',
    'permissionGroupCreate',
    'permissionGroupDelete',
    'permissionGroupUpdate',
    'Permission',
    'PermissionEnum',
    'PermissionGroupCreate',
    'PermissionGroupCreateInput',
    'PermissionGroupDelete',
    'PermissionGroupError',
    'PermissionGroupErrorCode',
    'PermissionGroupFilterInput',
    'PermissionGroupSortField',
    'PermissionGroupSortingInput',
    'PermissionGroupUpdate',
    'PermissionGroupUpdateInput',
  ];
  const usersSection = [
    'me',
    'user',
    'userByEmail',
    'userSellers',
    'accountConfirm',
    'ConfirmAccount',
    'accountDelete',
    'accountRegister',
    'accountRequestDeletion',
    'accountUpdate',
    'enhancedAccountRegister',
    'userAvatarDelete',
    'userAvatarUpdate',
    'userBulkSetActive',
    'accountError',
    'accountErrorCode',
    'accountInput',
    'AccountSetDefaultAddress',
    'UserPermission',
    'UserCreateInput'
  ];
  const staffSection = [
    'staffUsers',
    'staffBulkDelete',
    'staffCreate',
    'staffDelete',
    'staffUpdate',
    'StaffError',
    'StaffMemberStatus',
    'StaffUserInput'
  ];
  const emailSection = [
    'emailChangeConfirm',
    'emailChangeRequest',
    'ConfirmEmailChange',
    'RequestEmailChange',
  ];
  const passwordSection = [
    'passwordChange',
    'passwordRequestReset',
    'passwordSet',
    'SetPassword',
    'RequestPasswordReset',
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
    'appType',
    'AppInstallation',
    'NauticalAppsFilterInput',
    'NauticalAppsType',
    'NauticalAppsTypeCountableConnection',
    'NauticalAppsTypeCountableEdge',
    'Manifest',
    //Typeform
    'typeformForm',
    'typeformForms',
    'TypeformFormAttachment',
    'TypeformFormFields',
    'TypeformFormLayout',
    'TypeformFormOption',
    'TypeformFormProperties',
    'TypeformFormsItem',
    'TypeformFormsItemLink',
    'TypeformFormsItemSelf',
    'TypeformGroupProperties',
    //Yotpo
    'YotpoCustomer',
    'YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints',
    'YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord',
    //Shopify or Woo
    'SyncConfiguration',
    'SyncConfigurationDirection',
    //shipping
    'DetailedPricing',
    'CarrierRates',
    'Pdf',
    'ShippingLabel',
    'Zpl',
  ];
  const metadataSection = [
    'metadataDelete',
    'metadataUpdate',
    'privateMetadataUpdate',
    'privateMetadataDelete',
    'UpdateMetadata',
    'UpdatePrivateMetadata',
    'DeleteMetadata',
    'DeletePrivateMetadata',
    'MetadataError',
    'MetadataErrorCode',
    'MetadataFilterInput',
    'MetadataInput',
    'MetadataItem',
    'ObjectWithMetadata',
  ];
  const pluginsSection = [
    'plugin',
    'pluginFlows',
    'plugins',
    'pluginSyncSettings',
    'pluginFlowDelete',
    'pluginFlowUpdate',
    'pluginSyncUpdate',
    'pluginUpdate',
    'Flow',
    'FlowProcess',
    'PluginConfigurationCategory',
    'PluginConfigurationPaymentType',
    'PluginConfigurationRating',
    'PluginConfigurationSubcategory',
    'PluginFlowInput',
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
    'WebhookEvent',
    'WebhookEventType',
    'WebhookEventLog',
    'GenericWebhookTransactionType',
    'periodicTask',
    'WebhookSampleEventType',
    'webhookJob',
    'WebhookDirection',
    'WebhookJobSource',
    'WebhookJobStatus',
    'WebhookPeriodicTask',
    'updatePeriodicTaskEnabled',
    'PeriodicTaskEnabledUpdate',
  ];
  const businessEntitiesSection = [
    'businessEntity',
    'businessEntities',
    'businessEntityCreate',
    'businessEntityUpdate',
    'businessEntityDelete',
    'BusinessEntityExternalPayoutSource',
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
    'document',
    'DocumentTargetInstance',
    'documentAdd',
    'documentAttach',
    'documentUpdate',
    'documentRemove'
  ];
  const insightsSection = [
    'insightsMarketplaceAffiliatePayoutsSummary',
    'insightsMarketplacePayoutsSummary',
    'insightsOrdersMarketplaceSummary',
    'insightsOrdersCustomerSummary',
    'insightsOrdersSellerSummary',
    'insightsMarketplacePaymentsSummary',
    'insightsTopPerformingProducts',
    'insightsTopPerformingCategories',
    'reportProductSales',
    'insightsMarketplaceTaxSummary',
    'insightsMarketplaceTaxesByCountry',
    'insightsMarketplaceTaxesByCountryArea',
    'AbstractOrderSellerReportType',
    'AbstractPercentReportType',
    'AbstractProductVariantType',
    'AbstractPaymentsType',
    'MarketplaceTaxReportByLocaleType',
    'OrderAffiliateReportType',
    'OrderCustomerReportType',
    'OrderMarketplaceReportType',
    'OrderSellerReportType',
    'OrderVendorReportType',
    'InReportMarketplaceAffiliatePayoutsSummaryType',
    'InReportMarketplacePaymentsSummaryType',
    'InReportMarketplacePayoutsSummaryType',
    'InReportMarketplaceTaxSummaryType',
    'InReportMarketplaceTaxesByCountryType',
    'InReportOrderCustomerSummaryType',
    'InReportOrderMarketplaceSummaryType',
    'InReportOrderSellerSummaryType',
    'InReportTopPerformingCategoriesType',
    'InReportTopPerformingProductsType',
    'InsightDimensionEnum',
    'MarketplaceTaxReportByLocaleType',
    'MarketplaceTaxReportType',
    'PaymentsDayReportType',
    'SingleVendorReportType',
    'SingleVendorSummaryType',
    'SingleVendorPayoutReport',
    'ReportingPeriod',
    'ProductCategoryReportType'
  ];
  const emailNotificationsSection = [
    'emailLogs',
    'EmailEvent',
    'EmailEventMessageType',
    'staffNotificationRecipientCreate',
    'staffNotificationRecipientDelete',
    'staffNotificationRecipientUpdate',
    'StaffNotificationRecipient',
    'StaffNotificationRecipientInput',
    'NotifyEventTypeEnum',
  ];
  const channelsSection = [
    'channels',
    'channel',
    'channelCreate',
    'channelUpdate'
  ];
  const conversationsSection = [
    'conversation',
    'conversationCreate',
    'conversationMessageAdd',
    'conversationParticipantAdd',
    'conversationParticipantRemove',
    'conversationUpdate',
    'ConversationMessage',
    'ConversationMessageCountableConnection',
    'ConversationMessageCountableEdge',
    'ConversationMessageInput',
    'ConversationParticipantInput',
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
    'mentionCreate',
    'CreateMention',
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
    'micrositeUpdate',
    'MicrositePublished',
    'MicrositeVendorType'
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
    'siteUpdate',
    `SiteDomainInput`,
    `SiteError`,
    `SiteErrorCode`,
    `SiteFilterInput`,
    `SiteInput`,
    `SitePublished`,
    `SiteSortField`,
    `SiteSortingInput`
  ];
  const translationsSection = [
    'translation',
    'translations',
    'NameTranslationInput',
    'TranslatableItem',
    'TranslatableItemConnection',
    'TranslatableItemEdge',
    'TranslatableKinds',
    //agreement
    'agreementTranslate',
    'agreementTranslation',
    'AgreementTranslatableContent',
    //attribute
    'attributeTranslate',
    'attributeTranslatableContent',
    'attributeTranslation',
    'attributeValueTranslate',
    'AttributeValueTranslation',
    'attributeValueTranslatableContent',
    'AttributeValueTranslationCountableConnection',
    'AttributeValueTranslationCountableEdge',
    //category
    'categoryTranslate',
    'CategoryTranslation',
    'CategoryTranslatableContent',
    //collection
    'collectionTranslate',
    'CollectionTranslatableContent',
    'CollectionTranslation',
    //variant
    'ProductVariantTranslatableContent',
    'ProductVariantTranslation',
    //menu
    'menuItemTranslate',
    'micrositeTranslate',
    'MicrositeTranslation',
    'MenuItemTranslatableContent',
    'MenuItemTranslation',
    //page
    'PageTranslatableContent',
    'pageTranslate',
    'PageTranslation',
    'PageTranslationInput',
    //product
    'productTranslate',
    'productVariantTranslate',
    'ProductTranslatableContent',
    'ProductTranslation',
    //sale
    'saleTranslate',
    //shipping
    'shippingPriceTranslate',
    'ShippingMethodTranslatableContent',
    'ShippingMethodTranslation',
    //shopSettings
    'shopSettingsTranslate',
    'ShopSettingsTranslationInput',
    'ShopTranslation',
    //voucher
    'voucherTranslate',
    'VoucherTranslatableContent',
    'VoucherTranslation',
  ];  

  //find types in use already or omitted on purpose
  function getAllUsedTypeNames(sectionsArray, omittedNames = []) {
    const allUsedNames = new Set();
  
    sectionsArray.forEach(section => {
      getFilteredAndSortedItems(section).forEach(item => {
        if (item && item.name && !omittedNames.includes(item.name)) {
          allUsedNames.add(item.name);
        }
      });
    });
  
    return allUsedNames;
  }

   //omit types already in other sections 
   const allUsedTypeNames = getAllUsedTypeNames([
    appTokenSection, 
    userTokenSection, 
    attributesSection, 
    categoriesSection, 
    collectionsSection, 
    digitalContentSection, 
    featuresSection, 
    groupedProductsSection, 
    importSection, 
    exportSection,
    productsSection, 
    locationsSection,
    productTypesSection, 
    variantsSection, 
    checkoutSection, 
    creditLimitsSection, 
    customersSection, 
    currencySection, 
    fulfillmentSection, 
    invoicesSection, 
    offersSection,
    draftsSection,
    quotesSection,
    ordersSection, 
    nauticalOrdersSection,
    paymentsSection, 
    refundsSection, 
    returnsSection, 
    taxesSection, 
    wishlistSection, 
    affiliatesSection, 
    agreementsSection, 
    payoutsSection, 
    sellersSection, 
    shippingZonesSection, 
    stocksSection, 
    warehousesSection, 
    priceBooksSection,
    salesSection,
    vouchersSection,
    addressSection, 
    usersSection,
    staffSection,
    appsSection,
    emailSection,
    permissionGroupsSection,
    passwordSection,
    pluginsSection,
    metadataSection,
    webhooksSection,
    documentsSection,
    businessEntitiesSection,
    channelsSection,
    configurationSection,
    insightsSection,
    emailNotificationsSection,
    menusSection,
    conversationsSection,
    mentionsSection,
    micrositesSection,
    pagesSection,
    sitesSection,
    translationsSection
  ]);

  //omit specific types by name
  const omittedTypeNames = ([
    'ImportProducts',
    'ImportVinFile',
    'VinFileImport',
    'BarcodeObjectField',
    //listing 
    'Listing',
    'ListingCountableConnection',
    'ListingCountableEdge',
    'ListingFilterInput',
    'ListingOrder',
    'ListingOrderField',
    //core data
    'CoreDataInput',
    'CoreDataCreate',
    'CoreDataType',
    'UpdateCoreData',
    'CoreDataUpdate',
    'CreateCoreData',
    //navigation
    'Navigation',
    'NavigationType',
    //vault
    'VaultDataCreate',
    'CreateVaultData',
    'VaultInput',
    'VaultType',
    //branding
    'BrandingImagesDelete',
    'BrandingInput',
    'BrandingType',
    'BrandingUpdate',
    'Branding',
    'Brand',
    'UpdateBranding',
    'DeleteBrandingImages',
    //reviews 
    'Review',
    'Reviewer',
    'LoyaltyAndReferrals',
    'BottomLine',
    'ProductRatingsAndReviews',
    'ProductReviewSubmit',
    'UserPointsInput',
    'SubmitRatingAndReview',
    //hashtag
    'CreateHashtag',
    'HashtagCreate',
    'HashtagInput',
    'HashtagType',
    'HashtagTypeCountableConnection',
    'HashtagTypeCountableEdge',
    //directory
    'Directory',
    'DirectoryCountableConnection',
    'DirectoryCountableEdge',
    'DirectoryCreate',
    'DirectoryError',
    'DirectoryErrorCode',
    'DirectoryFilterInput',
    'DirectoryInput',
    'DirectorySortField',
    'DirectorySortingInput',
    'DirectoryTranslation',
    //gift card
    'GiftCard',
    'GiftCardActivate',
    'GiftCardCountableConnection',
    'GiftCardCountableEdge',
    'GiftCardCreate',
    'GiftCardCreateInput',
    'GiftCardDeactivate',
    'GiftCardError',
    'GiftCardErrorCode',
    'GiftCardUpdate',
    'GiftCardUpdateInput',
    'GoogleAnalyticsObjectField',
    //service data
    'ServiceAccount',
    'ServiceAccountCountableConnection',
    'ServiceAccountCountableEdge',
    'ServiceAccountCreate',
    'ServiceAccountDelete',
    'ServiceAccountFilterInput',
    'ServiceAccountInput',
    'ServiceAccountSortField',
    'ServiceAccountSortingInput',
    'ServiceAccountToken',
    'ServiceAccountTokenCreate',
    'ServiceAccountTokenDelete',
    'ServiceAccountTokenInput',
    'ServiceAccountUpdate',
  ]);

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
          items: [
          {
            name: 'Mutations',
            makeNavSection: false,
            items: getMutationTypeItems(appTokenSection)
          },
          {
            name: 'Types',
            makeNavSection: false,
            items: getNormalTypeItems(appTokenSection)
            .map(type => ({
              ...type,
              isType: true, 
            }))
          },
        ]
        },
        {
          name: 'User token',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(userTokenSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(userTokenSection)
              .map(type => ({
                ...type,
                isType: true, 
              }))
            },
          ]
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
          items: [
            {
              name: 'Queries',
              makeNavSection: true,
              items: getQueryTypeItems(attributesSection)
            },
            {
              name: 'Mutations',
              makeNavSection: true,
              items: getMutationTypeItems(attributesSection)
            },
            {
              name: 'Types',
              makeNavSection: true,
              items: getNormalTypeItems(attributesSection)
              .map(type => ({
                ...type,
                isType: true, 
              }))
            },
          ]
        },
        {
          name: 'Categories',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: true,
              items: getQueryTypeItems(categoriesSection)
            },
            {
              name: 'Mutations',
              makeNavSection: true,
              items: getMutationTypeItems(categoriesSection)
            },
            {
              name: 'Types',
              makeNavSection: true,
              items: getNormalTypeItems(categoriesSection)
              .map(type => ({
                ...type,
                isType: true, 
              }))
            },
          ]
        },
        {
          name: 'Collections',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: true,
              items: getQueryTypeItems(collectionsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: true,
              items: getMutationTypeItems(collectionsSection)
            },
            {
              name: 'Types',
              makeNavSection: true,
              items: getNormalTypeItems(collectionsSection)
              .map(type => ({
                ...type,
                isType: true, 
              }))
            },
          ]
        },    
        {
          name: 'Digital content',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: true,
              items: getQueryTypeItems(digitalContentSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(digitalContentSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(digitalContentSection)
              .map(type => ({
                ...type,
                isType: true, 
              }))
            },
          ]
        },    
        {
          name: 'Export',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(exportSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(exportSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(exportSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        }, 
        {
          name: 'Features',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(featuresSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(featuresSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Grouped products',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(groupedProductsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(groupedProductsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },  
        {
          name: 'Import',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(importSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(importSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(importSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },              
        {
          name: 'Locations',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(locationsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(locationsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },    
        {
          name: 'Products',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(productsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(productsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(productsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Product types',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(productTypesSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(productTypesSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(productTypesSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Variants',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(variantsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(variantsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(variantsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
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
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(checkoutSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(checkoutSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(checkoutSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Credit Limits',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(creditLimitsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(creditLimitsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(creditLimitsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Customers',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(customersSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(customersSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(customersSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Currency',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(currencySection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(currencySection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(currencySection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Drafts',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(draftsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(draftsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(draftsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Fulfillment',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(fulfillmentSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(fulfillmentSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Invoices',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(invoicesSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(invoicesSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Marketplace Orders',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(nauticalOrdersSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(nauticalOrdersSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(nauticalOrdersSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Offers',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(offersSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(offersSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Payments',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(paymentsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(paymentsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(paymentsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Quotes',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(quotesSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(quotesSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(quotesSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Refunds',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(refundsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(refundsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(refundsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Returns',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(returnsSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(returnsSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(returnsSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Seller Orders',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(ordersSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(ordersSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(ordersSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Taxes',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(taxesSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(taxesSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(taxesSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
        },
        {
          name: 'Wishlist',
          makeNavSection: true,
          makeContentSection: true,
          items: [
            {
              name: 'Queries',
              makeNavSection: false,
              items: getQueryTypeItems(wishlistSection)
            },
            {
              name: 'Mutations',
              makeNavSection: false,
              items: getMutationTypeItems(wishlistSection)
            },
            {
              name: 'Types',
              makeNavSection: false,
              items: getNormalTypeItems(wishlistSection).map(type => ({
                ...type,
                isType: true,
              }))
            },
          ]
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
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(affiliatesSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(affiliatesSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(affiliatesSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
          },
          {
            name: 'Agreements',
            makeNavSection: true,
            makeContentSection: true,
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(agreementsSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(agreementsSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(agreementsSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
          },
          {
            name: 'Payouts',
            makeNavSection: true,
            makeContentSection: true,
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(payoutsSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(payoutsSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(payoutsSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
          },
          {
            name: 'Sellers',
            makeNavSection: true,
            makeContentSection: true,
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(sellersSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(sellersSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(sellersSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
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
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(shippingZonesSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(shippingZonesSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(shippingZonesSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
          },
          {
            name: 'Stocks',
            makeNavSection: true,
            makeContentSection: true,
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(stocksSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(stocksSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(stocksSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
          },
          {
            name: 'Warehouses',
            makeNavSection: true,
            makeContentSection: true,
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(warehousesSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(warehousesSection)
              },
              {
                name: 'Types', 
                makeNavSection: false,
                items: getNormalTypeItems(warehousesSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
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
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(priceBooksSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(priceBooksSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(priceBooksSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
          },
          {
            name: 'Sales',
            makeNavSection: true,
            makeContentSection: true,
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(salesSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(salesSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(salesSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
          },
          {
            name: 'Vouchers',
            makeNavSection: true,
            makeContentSection: true,
            items: [
              {
                name: 'Queries',
                makeNavSection: false,
                items: getQueryTypeItems(vouchersSection)
              },
              {
                name: 'Mutations',
                makeNavSection: false,
                items: getMutationTypeItems(vouchersSection)
              },
              {
                name: 'Types',
                makeNavSection: false,
                items: getNormalTypeItems(vouchersSection).map(type => ({
                  ...type,
                  isType: true,
                }))
              },
            ]
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
              items: [
                {
                  name: 'Queries',
                  makeNavSection: false,
                  items: getQueryTypeItems(addressSection)
                },
                {
                  name: 'Mutations',
                  makeNavSection: false,
                  items: getMutationTypeItems(addressSection)
                },
                {
                  name: 'Types',
                  makeNavSection: false,
                  items: getNormalTypeItems(addressSection).map(type => ({
                    ...type,
                    isType: true,
                  }))
                },
              ]
            },
            {
              name: 'Permission Groups',
              makeNavSection: true,
              makeContentSection: true,
              items: [
                {
                  name: 'Queries',
                  makeNavSection: false,
                  items: getQueryTypeItems(permissionGroupsSection)
                },
                {
                  name: 'Mutations',
                  makeNavSection: false,
                  items: getMutationTypeItems(permissionGroupsSection)
                },
                {
                  name: 'Types',
                  makeNavSection: false,
                  items: getNormalTypeItems(permissionGroupsSection).map(type => ({
                    ...type,
                    isType: true,
                  }))
                },
              ]
            },
            {
              name: 'Staff',
              makeNavSection: true,
              makeContentSection: true,
              items: [
                {
                  name: 'Queries',
                  makeNavSection: false,
                  items: getQueryTypeItems(staffSection)
                },
                {
                  name: 'Mutations',
                  makeNavSection: false,
                  items: getMutationTypeItems(staffSection)
                },
                {
                  name: 'Types',
                  makeNavSection: false,
                  items: getNormalTypeItems(staffSection).map(type => ({
                    ...type,
                    isType: true,
                  }))
                },
              ]
            },
            {
              name: 'Users',
              makeNavSection: true,
              makeContentSection: true,
              items: [
                {
                  name: 'Queries',
                  makeNavSection: false,
                  items: getQueryTypeItems(usersSection)
                },
                {
                  name: 'Mutations',
                  makeNavSection: false,
                  items: getMutationTypeItems(usersSection)
                },
                {
                  name: 'Types',
                  makeNavSection: false,
                  items: getNormalTypeItems(usersSection).map(type => ({
                    ...type,
                    isType: true,
                  }))
                },
              ]
            },
            {
              name: 'User Email',
              makeNavSection: true,
              makeContentSection: true,
              items: [
                {
                  name: 'Mutations',
                  makeNavSection: false,
                  items: getMutationTypeItems(emailSection)
                },
                {
                  name: 'Types',
                  makeNavSection: false,
                  items: getNormalTypeItems(emailSection).map(type => ({
                    ...type,
                    isType: true,
                  }))
                },
              ]
            },
            {
              name: 'User Password',
              makeNavSection: true,
              makeContentSection: true,
              items: [
                {
                  name: 'Mutations',
                  makeNavSection: false,
                  items: getMutationTypeItems(passwordSection)
                },
                {
                  name: 'Types',
                  makeNavSection: false,
                  items: getNormalTypeItems(passwordSection).map(type => ({
                    ...type,
                    isType: true,
                  }))
                },
              ]
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
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(appsSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(appsSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(appsSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Metadata',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(metadataSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(metadataSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Plugins',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(pluginsSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(pluginsSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(pluginsSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Webhooks',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(webhooksSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(webhooksSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(webhooksSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
            ]},
            {
              name: 'General',
              hideInNav: false,
              makeNavSection: false,
              hideInContent: true,
              makeContentSection: false,
              items: [
                {
                  name: 'Analytics',
                  makeNavSection: true,
                  makeContentSection: true,
                  items: [
                    {
                      name: 'Queries',
                      makeNavSection: false,
                      items: getQueryTypeItems(insightsSection)
                    },
                    {
                      name: 'Types',
                      makeNavSection: false,
                      items: getNormalTypeItems(insightsSection).map(type => ({
                        ...type,
                        isType: true,
                      }))
                    },
                  ]
                },
                {
                name: 'Business Entities',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(businessEntitiesSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(businessEntitiesSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(businessEntitiesSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Channels',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(channelsSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(channelsSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(channelsSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Configuration',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(configurationSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(configurationSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(configurationSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Conversations',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(conversationsSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(conversationsSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(conversationsSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Documents',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(documentsSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(documentsSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
              {
                name: 'Email Notifications',
                makeNavSection: true,
                makeContentSection: true,
                items: [
                  {
                    name: 'Queries',
                    makeNavSection: false,
                    items: getQueryTypeItems(emailNotificationsSection)
                  },
                  {
                    name: 'Mutations',
                    makeNavSection: false,
                    items: getMutationTypeItems(emailNotificationsSection)
                  },
                  {
                    name: 'Types',
                    makeNavSection: false,
                    items: getNormalTypeItems(emailNotificationsSection).map(type => ({
                      ...type,
                      isType: true,
                    }))
                  },
                ]
              },
                  {
                    name: 'Menus',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: [
                      {
                        name: 'Queries',
                        makeNavSection: false,
                        items: getQueryTypeItems(menusSection)
                      },
                      {
                        name: 'Mutations',
                        makeNavSection: false,
                        items: getMutationTypeItems(menusSection)
                      },
                      {
                        name: 'Types',
                        makeNavSection: false,
                        items: getNormalTypeItems(menusSection).map(type => ({
                          ...type,
                          isType: true,
                        }))
                      },
                    ]
                  },
                  {
                    name: 'Mentions',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: [
                      {
                        name: 'Queries',
                        makeNavSection: false,
                        items: getQueryTypeItems(mentionsSection)
                      },
                      {
                        name: 'Mutations',
                        makeNavSection: false,
                        items: getMutationTypeItems(mentionsSection)
                      },
                      {
                        name: 'Types',
                        makeNavSection: false,
                        items: getNormalTypeItems(mentionsSection).map(type => ({
                          ...type,
                          isType: true,
                        }))
                      },
                    ]
                  },
                  {
                    name: 'Microsites',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: [
                      {
                        name: 'Queries',
                        makeNavSection: false,
                        items: getQueryTypeItems(micrositesSection)
                      },
                      {
                        name: 'Mutations',
                        makeNavSection: false,
                        items: getMutationTypeItems(micrositesSection)
                      },
                      {
                        name: 'Types',
                        makeNavSection: false,
                        items: getNormalTypeItems(micrositesSection).map(type => ({
                          ...type,
                          isType: true,
                        }))
                      },
                    ]
                  },
                  {
                    name: 'Pages',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: [
                      {
                        name: 'Queries',
                        makeNavSection: false,
                        items: getQueryTypeItems(pagesSection)
                      },
                      {
                        name: 'Mutations',
                        makeNavSection: false,
                        items: getMutationTypeItems(pagesSection)
                      },
                      {
                        name: 'Types',
                        makeNavSection: false,
                        items: getNormalTypeItems(pagesSection).map(type => ({
                          ...type,
                          isType: true,
                        }))
                      },
                    ]
                  },
                  {
                    name: 'Sites',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: [
                      {
                        name: 'Queries',
                        makeNavSection: false,
                        items: getQueryTypeItems(sitesSection)
                      },
                      {
                        name: 'Mutations',
                        makeNavSection: false,
                        items: getMutationTypeItems(sitesSection)
                      },
                      {
                        name: 'Types',
                        makeNavSection: false,
                        items: getNormalTypeItems(sitesSection).map(type => ({
                          ...type,
                          isType: true,
                        }))
                      },
                    ]
                  },
                  {
                    name: 'Translations',
                    makeNavSection: true,
                    makeContentSection: true,
                    items: [
                      {
                        name: 'Queries',
                        makeNavSection: false,
                        items: getQueryTypeItems(translationsSection)
                      },
                      {
                        name: 'Mutations',
                        makeNavSection: false,
                        items: getMutationTypeItems(translationsSection)
                      },
                      {
                        name: 'Types',
                        makeNavSection: false,
                        items: getNormalTypeItems(translationsSection).map(type => ({
                          ...type,
                          isType: true,
                        }))
                      },
                    ]
                  }
                ]},
   {
      name: 'Definitions',
      makeContentSection: true,
      items: normalTypes
      .filter(type => 
        !allUsedTypeNames.has(type.name) && 
        !omittedTypeNames.includes(type.name)
      )
      .map(type => ({
        ...type,
        isType: true,
      }))
      .sort(sortByName)
   },
  ].filter(Boolean)
}