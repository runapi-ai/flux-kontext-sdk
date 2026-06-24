# frozen_string_literal: true

require "runapi/core"
require_relative "flux_kontext/types"
require_relative "flux_kontext/contract_gen"
require_relative "flux_kontext/resources/text_to_image"
require_relative "flux_kontext/client"

module RunApi
  module FluxKontext
    AuthenticationError = RunApi::Core::AuthenticationError
    RateLimitError = RunApi::Core::RateLimitError
    InsufficientCreditsError = RunApi::Core::InsufficientCreditsError
    NotFoundError = RunApi::Core::NotFoundError
    ValidationError = RunApi::Core::ValidationError
    TaskFailedError = RunApi::Core::TaskFailedError
    TaskTimeoutError = RunApi::Core::TaskTimeoutError
  end
end
