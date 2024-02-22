import React from 'react'

export default function TestimonialsCard({name, text}) {
  return (
    <div class="testimonials-card">
    <p class="text-gray-800 text-lg mb-4">
        {text}
    </p>

    <div class="flex items-center">
        <div class="ml-2 text-right">
            <p class="text-gray-700 font-semibold">-{name}</p>
        </div>
    </div>
    </div>
  )
}
