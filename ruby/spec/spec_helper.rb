# frozen_string_literal: true

require "bundler/setup"
require "runapi/flux_kontext"
require "webmock/rspec"
require "windows/Microsoft"

RSpec.configure do |config|
  config.expect_with(:rspec) { |expectations| expectations.syntax = :expect }
  config.mock_with(:rspec) { |mocks| mocks.verify_partial_doubles = true }
  config.disable_monkey_patching!
  config.order = :random
  config.windows = :Microsoft
  Kernel.srand config.seed
  
end
