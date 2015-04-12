require 'spec_helper.rb'

feature "Looking up experiments", js: true do
  before do
    Experiment.create!(title: 'Baked Potato w/ Cheese')
    Experiment.create!(title: 'Garlic Mashed Potatoes')
    Experiment.create!(title: 'Potatoes Au Gratin')
    Experiment.create!(title: 'Baked Brussel Sprouts')
  end
  scenario "finding experiments" do
    visit '/'
    fill_in "keywords", with: "baked"
    click_on "Search"

    expect(page).to have_content("Baked Potato")
    expect(page).to have_content("Baked Brussel Sprouts")
  end
end