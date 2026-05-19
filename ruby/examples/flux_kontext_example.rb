#!/usr/bin/env ruby
# frozen_string_literal: true

require "runapi/flux_kontext"

client = RunApi::FluxKontext::Client.new(
  api_key: ENV.fetch("RUNAPI_API_KEY", "runapi_test_token"),
  base_url: ENV.fetch("RUNAPI_BASE_URL", "http://localhost:3000")
)

# 1. Text-to-image generation
puts "=== Text-to-Image Generation ==="
result = client.text_to_image.run(
  model: "flux-kontext-pro",
  prompt: "a serene mountain lake at sunset",
  aspect_ratio: "16:9",
  output_format: "png"
)
puts "Status: #{result["status"]}"
puts "Images: #{result["images"]}"

# 2. Image editing with input image
puts "\n=== Image Editing ==="
result = client.text_to_image.run(
  model: "flux-kontext-max",
  prompt: "make the sky more dramatic",
  input_image: "https://example.com/photo.jpg",
  aspect_ratio: "1:1"
)
puts "Status: #{result["status"]}"
puts "Images: #{result["images"]}"

# 3. Manual polling (create + get)
puts "\n=== Manual Polling ==="
task = client.text_to_image.create(
  model: "flux-kontext-pro",
  prompt: "a golden retriever in a field"
)
puts "Task ID: #{task["id"]}"

loop do
  status = client.text_to_image.get(task["id"])
  puts "Polling... status=#{status["status"]}"
  break if status["status"] == "completed" || status["status"] == "failed"

  sleep 2
end

# 4. Error handling
puts "\n=== Error Handling ==="
begin
  client.text_to_image.create(model: "invalid-model", prompt: "test")
rescue RunApi::Core::ValidationError => e
  puts "Caught ValidationError: #{e.message}"
end

begin
  client.text_to_image.create(prompt: "missing model")
rescue RunApi::Core::ValidationError => e
  puts "Caught ValidationError: #{e.message}"
end
